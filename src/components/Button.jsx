import React from "react";

export default function Button({style, children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={className}
    >
      {children}
    </button>
  );
}
