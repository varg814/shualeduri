import React from "react";

export default function Input({
  className,
  type,
  placeholder,
  onChange,
  value,
  ...props
}) {
  return (
    <input
    value={value}
      className={className}
      {...props}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
