import React from "react";
import "../../styles/Loading.css"; 

type LoadingProps = {
  className?: string;
  overlay?: boolean;
};

const Loading: React.FC<LoadingProps> = ({
  className = "",
  overlay = false,
}) => {
  return (
    <div
      className={`${
        overlay
          ? "fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/30"
          : "flex items-center justify-center"
      } ${className}`}
    >
      <div className="loader" />
    </div>
  );
};

export default Loading;
