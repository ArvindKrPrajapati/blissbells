import React from "react";
type Props = {
  data: any[];
};
export default function ProcessStepper({ data }: Props) {
  return (
    <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {data.map((item) => (
        <li className="mb-10 ms-6" key={item.id}>
          <span className="absolute flex items-center justify-center w-8 h-8 bg-pink-600 rounded-full -start-4 text-white">
            {item.id}
          </span>
          <h3 className="text-black font-semibold">{item.text}</h3>
          <p className="text-sm text-gray-600">{item.subText}</p>
        </li>
      ))}
    </ol>
  );
}
