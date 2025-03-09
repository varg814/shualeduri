import React from "react";
import Button from "./Button";

export default function Toggle({ children, text, onClick }) {
  return (
    <div className="flex gap-[9px] justify-center">
      <p className="text-white">{text}</p>
      <Button
        className="cursor-pointer text-[#FC4747]"
        onClick={onClick}
        children={children}
      />
    </div>
  );
}
