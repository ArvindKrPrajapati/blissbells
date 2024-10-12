import React from "react";
type props = {
  children: React.ReactElement;
  className?: string;
};
export default function Container({ children, className }: props) {
  return (
    <div className={`md:max-w-5xl mx-auto w-full font-sans ${className}`}>
      {children}
    </div>
  );
}
