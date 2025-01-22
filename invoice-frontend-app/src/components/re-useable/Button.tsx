import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-full text-white bg-[#194DA3] font-medium text-lg shadow-md hover:bg-[#194DA3] focus:ring-2 focus:bg-[#194DA3] disabled:bg-[#194DA3]/[.5] disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;

