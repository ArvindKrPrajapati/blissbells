import { Spinner } from "@nextui-org/react";
import React from "react";

type props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  isDisabled?: boolean;
};
export default function ButtonContainer({
  children,
  className,
  onClick = () => {},
  type = "button",
  isDisabled = false,
  isLoading = false,
}: props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled || isLoading}
      className={`bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300  hover:animate-none disabled:opacity-50 flex justify-center ${className}`}
    >
      <div className="flex gap-2">
        {isLoading ? <Spinner size="sm" color="default" /> : null}
        {children}
      </div>
    </button>
  );
}
