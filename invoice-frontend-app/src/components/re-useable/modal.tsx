
// import { ReactNode } from "react";

// type ModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   children: ReactNode;
//   size?: "sm" | "md" | "lg" | "m" | "l";
// };

// export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = "lg" }) => {
//   if (!isOpen) return null;

//   const sizeClasses = {
//     l: "max-w-xl", 
//     m: "max-w-sm", 
//     sm: "max-w-md", 
//     md: "max-w-lg", 
//     lg: "max-w-4xl", 
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div
//         className={`bg-white rounded-2xl shadow-lg w-full ${sizeClasses[size]} relative 
//           mx-4 sm:mx-6 md:mx-8 lg:mx-auto overflow-auto scrollbar- max-h-[95vh]`}
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 rounded-xl"
//         >
//           <img src="/cancel.svg" alt="cancel" />
//         </button>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// };
