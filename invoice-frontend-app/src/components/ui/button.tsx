import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid"
}

export const Button = ({ variant = "solid", className, ...props }: ButtonProps) => {
  const base = "px-3 py-1 rounded text-sm font-medium"
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100"
  }

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className || ""}`}
    />
  )
}
