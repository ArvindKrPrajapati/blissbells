import React from "react";
type Props = {
  title: string;
};
export default function PageTitle({ title }: Props) {
  return (
    <h2 className="mb-4 font-semibold my-text animate-[appearance-in_400ms] border-b pb-2">
      {title}
    </h2>
  );
}
