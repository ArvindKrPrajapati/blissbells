import React from "react";
type props = {
  children: React.ReactNode;
  className?: string;
};
export default function ContainerFluid({ children, className }: props) {
  return (
    <div className={`max-width mx-auto font-sans ${className}`}>{children}</div>
  );
}
