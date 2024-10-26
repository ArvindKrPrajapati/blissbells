"use client";
import { FB_APP_ID } from "@/constants/constants";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    FB: FacebookSDK;
    fbAsyncInit: () => void;
  }
}

type Props = {
  closeModal: () => void;
};
const FacebookLogin = ({ closeModal }: Props) => {
  const handleLoginSuccess = (userData: FacebookUserData) => {
    console.log("Login successful:", userData);
    closeModal();
  };

  const handleLoginFailure = (error: string) => {
    console.error("Login failed:", error);
  };

  const handleLogout = () => {
    console.log("User logged out");
  };
  return (
    <FacebookLoginConponent
      appId={FB_APP_ID}
      onLoginSuccess={handleLoginSuccess}
      onLoginFailure={handleLoginFailure}
      onLogout={handleLogout}
    />
  );
};
const FacebookLoginConponent: React.FC<FacebookLoginProps> = ({
  appId,
  onLoginSuccess,
  onLoginFailure,
  onLogout,
}) => {
  const [isSDKLoaded, setSDKLoaded] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<FacebookUserData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Facebook SDK
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: appId,
          cookie: true,
          xfbml: true,
          version: "v21.0",
        });

        setSDKLoaded(true);

        // Check initial login status
        window.FB.getLoginStatus((response: FacebookLoginResponse) => {
          if (response.status === "connected") {
            setIsLoggedIn(true);
            fetchUserData();
          }
        });
      };

      // Load SDK
      const loadSDK = () => {
        if (document.getElementById("facebook-jssdk")) return;

        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.src = "https://connect.facebook.net/en_US/sdk.js";

        const firstScript = document.getElementsByTagName("script")[0];
        if (firstScript?.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        }
      };

      loadSDK();
    }
  }, [appId]);

  const fetchUserData = () => {
    if (typeof window !== "undefined") {
      window.FB.api(
        "/me",
        { fields: "name,email,picture" },
        (response: FacebookUserData) => {
          if (response && !("error" in response)) {
            setUserData(response);
            onLoginSuccess?.(response);
          }
        }
      );
    }
  };

  const handleLogin = () => {
    if (!isSDKLoaded) {
      const errorMessage = "Facebook SDK not yet loaded";
      setError(errorMessage);
      onLoginFailure?.(errorMessage);
      return;
    }

    if (typeof window !== "undefined") {
      window.FB.login(
        (response: FacebookLoginResponse) => {
          if (response.authResponse) {
            setIsLoggedIn(true);
            setError(null);
            fetchUserData();
          } else {
            const errorMessage = "Login failed or was cancelled";
            setError(errorMessage);
            onLoginFailure?.(errorMessage);
          }
        },
        { scope: "public_profile,email" }
      );
    }
  };

  const handleLogout = () => {
    if (!isSDKLoaded) return;

    if (typeof window !== "undefined") {
      window.FB.logout(() => {
        setIsLoggedIn(false);
        setUserData(null);
        onLogout?.();
      });
    }
  };

  return (
    <Button
      onClick={handleLogin}
      isDisabled={!isSDKLoaded}
      radius="full"
      className="bg-white border-1"
      startContent={
        <i className="fa-brands fa-facebook text-2xl text-blue-700"></i>
      }
    >
      Login with Facebook
    </Button>
  );
};

export default FacebookLogin;

// types.ts
interface FacebookSDK {
  init(params: {
    appId: string;
    cookie: boolean;
    xfbml: boolean;
    version: string;
  }): void;
  login(
    callback: (response: FacebookLoginResponse) => void,
    options?: { scope: string }
  ): void;
  logout(callback: (response: any) => void): void;
  getLoginStatus(callback: (response: FacebookLoginResponse) => void): void;
  api(
    path: string,
    params: { fields: string },
    callback: (response: FacebookUserData) => void
  ): void;
}

interface FacebookLoginResponse {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: {
    accessToken: string;
    userID: string;
    expiresIn: number;
    signedRequest: string;
  };
}

interface FacebookUserData {
  id: string;
  name: string;
  email: string;
  picture?: {
    data: {
      url: string;
      width: number;
      height: number;
    };
  };
}

interface FacebookLoginProps {
  appId: string;
  onLoginSuccess?: (userData: FacebookUserData) => void;
  onLoginFailure?: (error: string) => void;
  onLogout?: () => void;
}
