"use client";

import { apiPost } from "@/lib/apiCalls";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ButtonContainer from "../ButtonContainer";
import GoogleSignIn from "./GoogleSignIn";

type props = {
  closeModal: () => void;
};
export default function Login({ closeModal }: props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const pathname = usePathname();

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
    e.preventDefault();

    if (!isValidEmail || !isValidPassword) {
      return;
    }
    try {
      setLoading(true);
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

        toast.success("Login Successfully");
        closeModal();

        router.refresh();
      } else {
        setLoading(false);
        toast.error(res.error);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="pt-8">
      <div className="flex justify-center items-center pt-3 -ml-3">
        <Image src={"/images/logo.png"} alt="logo" width={150} height={70} />
      </div>
      <p className="text-sm text-center text-zinc-900 py-3">
        Login to continue
      </p>
      <form
        className="md:p-5 py-5 px-2 flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <Input
          value={email}
          type="email"
          label="Email"
          variant="bordered"
          isInvalid={!isValidEmail && email.length > 0}
          // color={!isValidEmail && email.length > 0 ? "danger" : "success"}
          errorMessage={
            !isValidEmail && email.length > 0 && "Please enter a valid email"
          }
          onValueChange={validateEmail}
          radius="sm"
          className="active:border-zinc-700"
          style={{ fontSize: "16px" }}
        />
        <Input
          label="Password"
          variant="bordered"
          isInvalid={!isValidPassword && password.length > 0}
          onValueChange={validatePassword}
          errorMessage={
            !isValidPassword && password.length > 0 && "Password is too short"
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
        <ButtonContainer
          type="submit"
          isLoading={loading}
          isDisabled={!isValidEmail || !isValidPassword}
        >
          Login
        </ButtonContainer>
        <p className="font-semibold text-center">or</p>
        <GoogleSignIn closeModal={closeModal} />
      </form>
    </div>
  );
}
