import React from "react";
type Props = {
  isFixed?: boolean;
};
export default function ActionLoader({ isFixed = true }: Props) {
  return (
    <div
      className={`${isFixed ? "fixed" : "static"} z-100 flex justify-center items-center h-full w-full top-0 left-0 bg-transparent gap-2`}
    >
      <span className="loader"></span>
    </div>
  );
}
