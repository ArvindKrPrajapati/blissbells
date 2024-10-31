import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { apiPost } from "@/lib/apiCalls";
import { Button } from "@nextui-org/react";
import ActionLoader from "../ActionLoader";
import { CLIENT_ID } from "@/constants/constants";
type props = {
  closeModal: () => void;
};
export default function GoogleSignIn({ closeModal }: props) {
  const [actionLoading, setActionLoading] = useState(false);
  const router = useRouter();
  // const [width, setWidth] = useState(0);

  const handleGoogleLogin = async (obj: any) => {
    try {
      setActionLoading(true);
      const res = await apiPost("/authentication", {
        strategy: "google",
        access_token: obj.credential,
      });
      if (res.accessToken) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 100000);
        // Use document.cookie to set the cookie
        document.cookie = `auth=${JSON.stringify(
          res
        )}; expires=${expirationDate.toUTCString()}; path=/`;
        router.refresh();
        setTimeout(() => {
          router.push("/blissbells");
          toast.success("Login Successfully");
        }, 300);
      }
    } catch (error: any) {
      toast.error(error.message);
      setActionLoading(false);
    }
  };

  // const handleResize = () => {
  //   // Get the button element by its ref
  //   const button = document.getElementById("btn");

  //   if (button) {
  //     // Update the state with the button width
  //     setWidth(button.offsetWidth);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);

  //   // Initial measurement
  //   handleResize();

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div className="">
      {actionLoading ? <ActionLoader /> : null}
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            toast.error("Login Failed, try using otp");
          }}
          shape="circle"
        />
      </GoogleOAuthProvider>
    </div>
  );
}
