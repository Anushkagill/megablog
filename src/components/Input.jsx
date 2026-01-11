import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-600"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        className={`
          px-4 py-2 rounded-lg
          bg-white/80 text-gray-800
          border border-gray-300
          focus:ring-2 focus:ring-indigo-400
          focus:outline-none
          transition
          w-full
          ${className}
        `}
        {...props}
      />
    </div>
  );
});

export default Input;
