import React from "react";

type LoadingProps = {
  className?: string;
  color?: string; 
  size?: number; 
  overlay?: boolean; 
};

const Loading: React.FC<LoadingProps> = ({
  className = "",
  color = "#ffffff", 
  size = 20, 
  overlay = false, 
}) => {
  return (
    <div
      className={`${
        overlay
          ? "fixed inset-0 bg-black/[0.3] flex items-center justify-center z-[100]"
          : "flex items-center justify-center"
      } ${className}`}
    >
      <div
        className={`relative animate-spin ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${size / 8}px`,
          borderStyle: "solid",
          borderColor: `${color} transparent transparent transparent`, 
          borderRadius: "50%"
        }}
      >
      </div>
    </div>
  );
};

export default Loading;
