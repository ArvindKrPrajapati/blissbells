import React from "react";
type props = {
  children: React.ReactNode;
  className?: string;
};
export default function Container({ children, className }: props) {
  return (
    <div className={`md:max-w-6xl mx-auto w-full font-sans ${className}`}>
      {children}
    </div>
  );
}
