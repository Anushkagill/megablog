import React from "react";

function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-4 py-2 rounded-lg font-medium
        bg-gradient-to-r from-indigo-500 to-pink-500
        text-white
        hover:from-indigo-600 hover:to-pink-600
        shadow-md hover:shadow-xl
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
