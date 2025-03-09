import React from "react";

export default function Input({ className, type, placeholder, ...props }) {
  return (
    <input
      className={className}
      {...props}
      type={type}
      placeholder={placeholder}
    />
  );
}

