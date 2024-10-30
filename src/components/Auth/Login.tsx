"use client";

import { apiPost } from "@/lib/apiCalls";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonContainer from "../ButtonContainer";
import GoogleSignIn from "./GoogleSignIn";
import FacebookLogin from "./FacebookLogin";

type props = {
  closeModal: () => void;
};
const TIMER = 120;
export default function Login({ closeModal }: props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [optSent, setOptSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [forgetPassword, setForgetPassword] = useState(false);

  const [otpTimer, setOtpTimer] = useState(TIMER);
  const [startTimer, setStartTimer] = useState(false);

  const [resetPasswords, setResetPasswords] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [passwordToken, setPasswordToken] = useState("");

  const toggleVisibility = () => setShowPassword(!showPassword);

  const router = useRouter();
  const validateEmail = (_email: string) => {
    setEmail(_email);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmail(emailRegex.test(_email));
  };

  const validatePassword = (_password: string) => {
    setPassword(_password);
    if (_password.length > 7) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    if (
      createAccount
        ? !isValidEmail || !isValidPassword || !name
        : !isValidEmail || !isValidPassword
    ) {
      return;
    }
    try {
      setLoading(true);
      if (createAccount) {
        const res = await apiPost("/users", {
          name,
          email,
          password,
        });
        if (res) {
          setOptSent(true);
          setStartTimer(true);
          setOtp("");
          toast.success(res.message);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        const res = await apiPost("/authentication", {
          email,
          password,
          strategy: "local",
        });
        if (res.accessToken) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 100000);
          // Use document.cookie to set the cookie
          document.cookie = `auth=${JSON.stringify(
            res
          )}; expires=${expirationDate.toUTCString()}; path=/`;
          router.refresh();
          // closeModal();

          router.push("/blissbells");
          toast.success("Login Successfully");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e: any) => {
    try {
      e.preventDefault();

      setLoading(true);
      if (forgetPassword) {
        const res = await apiPost("/verify-otp", {
          email,
          otp,
        });
        if (res) {
          setPasswordToken(res.reset_token);
          setResetPasswords({
            password: "",
            confirmPassword: "",
            showConfirmPassword: false,
            showPassword: false,
          });
        } else {
          toast.error("Something went wrong");
        }
      } else {
        const res = await apiPost("/authentication", {
          email,
          otp,
          strategy: "local",
        });
        if (res.accessToken) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 100000);
          // Use document.cookie to set the cookie
          document.cookie = `auth=${JSON.stringify(
            res
          )}; expires=${expirationDate.toUTCString()}; path=/`;
          router.refresh();
          // closeModal();
          router.push("/blissbells");
          toast.success("Login Successfully");
        } else {
          toast.error(res.error);
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (e: any) => {
    e?.preventDefault();
    if (startTimer || loading) {
      return;
    }
    try {
      setLoading(true);
      const res = await apiPost("/send-otp", { email }, false);
      if (res) {
        setStartTimer(true);
        setOptSent(true);

        toast.success(res.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: any) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const res = await apiPost(
        "/change-password",
        { password: resetPasswords.password, reset_token: passwordToken },
        false
      );
      if (res) {
        setForgetPassword(false);
        setOptSent(false);
        toast.success(res.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      closeModal();
      setLoading(false);
    }
  };
  useEffect(() => {
    if (startTimer) {
      let i = TIMER;
      const interval = setInterval(() => {
        setOtpTimer((t) => t - 1);
        i--;

        if (i == 0) {
          setStartTimer(false);
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        setStartTimer(false);
        setOtpTimer(TIMER);
        clearInterval(interval);
      };
    }
  }, [startTimer]);

  const otpComp = (
    <>
      <p className="text-sm text-center text-zinc-900 py-3">
        OTP sent to <span className="text-blue-500">{email}</span>
      </p>
      <form
        className="md:p-5 py-5 px-2 flex flex-col gap-3"
        onSubmit={handleOtpVerification}
      >
        <Input
          value={otp}
          type="text"
          label="Enter OTP"
          variant="bordered"
          isInvalid={otp && otp.length <= 5 ? true : false}
          // color={!isValidEmail && email.length > 0 ? "danger" : "success"}
          errorMessage={otp && otp.length <= 5 && "Please enter a valid OTP"}
          onValueChange={(e) => setOtp(e)}
          radius="sm"
          className="active:border-zinc-700"
          style={{ fontSize: "16px" }}
          isRequired={true}
          maxLength={6}
        />
        <div className="flex justify-between">
          <p
            className={`text-blue-500 font-semibold m-0 text-sm cursor-pointer ${!startTimer && !loading ? "opacity-100" : "opacity-70"}`}
            onClick={resendOtp}
          >
            Resend {startTimer ? `in ${otpTimer}s` : null}
          </p>
          <p
            className="text-blue-500 font-semibold m-0 text-sm cursor-pointer"
            onClick={() => {
              setOptSent(false);
              setStartTimer(false);
              setOtp("");
            }}
          >
            Wrong email?
          </p>
        </div>
        <ButtonContainer
          type="submit"
          isLoading={loading}
          className="mt-3"
          isDisabled={otp.length <= 5}
        >
          Verify OTP
        </ButtonContainer>
      </form>
    </>
  );

  return (
    <div className="pt-8">
      <div className="flex justify-center items-center pt-3 -ml-3">
        <Image src={"/images/logo.png"} alt="logo" width={150} height={70} />
      </div>

      {forgetPassword ? (
        <>
          {passwordToken ? (
            <form
              onSubmit={handleResetPassword}
              className="p-3 flex flex-col gap-5"
            >
              <p className="text-sm text-center text-zinc-900 py-3">
                Create New Password
              </p>
              <Input
                value={resetPasswords.password}
                label="New Password"
                variant="bordered"
                isInvalid={
                  resetPasswords.password.length > 0 &&
                  resetPasswords.password.length < 8
                }
                onValueChange={(e) => {
                  setResetPasswords({ ...resetPasswords, password: e });
                }}
                errorMessage={
                  resetPasswords.password.length > 0 &&
                  resetPasswords.password.length < 8 &&
                  "Password is too short"
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => {
                      setResetPasswords({
                        ...resetPasswords,
                        showPassword: !resetPasswords.showPassword,
                      });
                    }}
                  >
                    {resetPasswords.showPassword ? (
                      <i className="fa-solid fa-eye-slash text-2xl text-default-400 pointer-events-none"></i>
                    ) : (
                      <i className="fa-solid fa-eye text-2xl text-default-400 pointer-events-none"></i>
                    )}
                  </button>
                }
                type={resetPasswords.showPassword ? "text" : "password"}
                radius="sm"
                className="active:border-zinc-700"
                style={{ fontSize: "16px" }}
              />
              <Input
                value={resetPasswords.confirmPassword}
                label="Confirm Password"
                variant="bordered"
                isInvalid={
                  resetPasswords.confirmPassword.length > 0 &&
                  resetPasswords.confirmPassword != resetPasswords.password
                }
                onValueChange={(e) => {
                  setResetPasswords({
                    ...resetPasswords,
                    confirmPassword: e,
                  });
                }}
                errorMessage={
                  resetPasswords.confirmPassword.length > 0 &&
                  resetPasswords.confirmPassword != resetPasswords.password &&
                  "Password doesn't match"
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => {
                      setResetPasswords({
                        ...resetPasswords,
                        showConfirmPassword:
                          !resetPasswords.showConfirmPassword,
                      });
                    }}
                  >
                    {resetPasswords.showConfirmPassword ? (
                      <i className="fa-solid fa-eye-slash text-2xl text-default-400 pointer-events-none"></i>
                    ) : (
                      <i className="fa-solid fa-eye text-2xl text-default-400 pointer-events-none"></i>
                    )}
                  </button>
                }
                type={resetPasswords.showConfirmPassword ? "text" : "password"}
                radius="sm"
                className="active:border-zinc-700"
                style={{ fontSize: "16px" }}
              />
              <ButtonContainer
                type="submit"
                isLoading={loading}
                isDisabled={
                  resetPasswords.password.length < 8 ||
                  resetPasswords.password != resetPasswords.confirmPassword
                }
              >
                Change Password
              </ButtonContainer>
              <br />
            </form>
          ) : (
            <>
              {optSent ? (
                otpComp
              ) : (
                <>
                  <p className="text-sm text-center text-zinc-900 py-3">
                    Forgot Password
                  </p>
                  <form
                    className="md:p-5 py-5 px-2 flex flex-col gap-5"
                    onSubmit={resendOtp}
                  >
                    <Input
                      value={email}
                      type="email"
                      label="Email"
                      variant="bordered"
                      isInvalid={!isValidEmail && email.length > 0}
                      // color={!isValidEmail && email.length > 0 ? "danger" : "success"}
                      errorMessage={
                        !isValidEmail &&
                        email.length > 0 &&
                        "Please enter a valid email"
                      }
                      onValueChange={validateEmail}
                      radius="sm"
                      className="active:border-zinc-700"
                      style={{ fontSize: "16px" }}
                      isDisabled={optSent}
                    />
                    <ButtonContainer
                      type="submit"
                      isLoading={loading}
                      isDisabled={!isValidEmail}
                    >
                      Send OTP
                    </ButtonContainer>
                  </form>
                </>
              )}
              <div className="text-center py-3">
                <p
                  onClick={() => {
                    setOptSent(false);
                    setStartTimer(false);
                    setForgetPassword(false);
                  }}
                  className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 font-semibold duration-300 transition-all"
                >
                  Remembered Password? Login
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {optSent ? (
            otpComp
          ) : (
            <>
              <p className="text-sm text-center text-zinc-900 py-3">
                {createAccount ? "Create New Account" : " Login to continue"}
              </p>
              <form
                className="md:p-5 py-5 px-2 flex flex-col gap-5"
                onSubmit={handleSubmit}
              >
                {createAccount ? (
                  <Input
                    value={name}
                    type="text"
                    label="Full Name"
                    variant="bordered"
                    isInvalid={name && name.length < 5 ? true : false}
                    // color={!isValidEmail && email.length > 0 ? "danger" : "success"}
                    errorMessage={
                      name && name.length > 5 && "Please enter a valid name"
                    }
                    onValueChange={(e) => setName(e)}
                    radius="sm"
                    className="active:border-zinc-700"
                    style={{ fontSize: "16px" }}
                    isRequired={true}
                  />
                ) : null}
                <Input
                  value={email}
                  type="email"
                  label="Email"
                  variant="bordered"
                  isInvalid={!isValidEmail && email.length > 0}
                  // color={!isValidEmail && email.length > 0 ? "danger" : "success"}
                  errorMessage={
                    !isValidEmail &&
                    email.length > 0 &&
                    "Please enter a valid email"
                  }
                  onValueChange={validateEmail}
                  radius="sm"
                  className="active:border-zinc-700"
                  style={{ fontSize: "16px" }}
                />
                <Input
                  value={password}
                  label="Password"
                  variant="bordered"
                  isInvalid={!isValidPassword && password.length > 0}
                  onValueChange={validatePassword}
                  errorMessage={
                    !isValidPassword &&
                    password.length > 0 &&
                    "Password is too short"
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye-slash text-2xl text-default-400 pointer-events-none"></i>
                      ) : (
                        <i className="fa-solid fa-eye text-2xl text-default-400 pointer-events-none"></i>
                      )}
                    </button>
                  }
                  type={showPassword ? "text" : "password"}
                  radius="sm"
                  className="active:border-zinc-700"
                  style={{ fontSize: "16px" }}
                />
                {!createAccount ? (
                  <div className="text-end">
                    <p
                      onClick={() => {
                        setForgetPassword(true);
                      }}
                      className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 font-semibold duration-300 transition-all"
                    >
                      Forgot Password?
                    </p>
                  </div>
                ) : null}
                <ButtonContainer
                  type="submit"
                  isLoading={loading}
                  isDisabled={
                    createAccount
                      ? !isValidEmail || !isValidPassword || name.length < 5
                      : !isValidEmail || !isValidPassword
                  }
                >
                  {createAccount ? "Register" : " Login"}
                </ButtonContainer>
                <div className="text-center">
                  <p
                    onClick={() => {
                      setCreateAccount(!createAccount);
                    }}
                    className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 font-semibold duration-300 transition-all"
                  >
                    {createAccount
                      ? "Already Have Account? Login"
                      : "Create New Account"}
                  </p>
                </div>
                <p className="font-semibold text-center">or</p>
                <div className="flex items-center gap-3 md:flex-row flex-col justify-center">
                  <GoogleSignIn closeModal={closeModal} />
                  <FacebookLogin closeModal={closeModal} />
                </div>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
}
