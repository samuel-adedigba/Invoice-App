// import React from 'react'
// type    InputProps={
//     name: string,
//     type: string,
//     value: any,
//    // onChange?: ()=> void ,
//     placeholder: string ,
//     error: string ,
//     label: string
// }

//  const Input:React.FC<InputProps>=({   name, type, error,value, 
//   //onChange, 
//   label,placeholder  }) =>{
//   return (
//     <div>
//     <label   
//     htmlFor={name}

//     >
//     {label }
//     </label>
//       <input
//       id={name}
//       type={type}
//       name={name}
//       value={value}
//      // onChange={onChange}
//       placeholder={placeholder}
//        />
//        <p>
//          {error }
//        </p>
     
//     </div>
//   )
// }

// export default Input
 
import React from 'react';
// import type { Props } from ".../"

type InputFieldProps = {
  label?: string; // Label for the input
  type?: string; // Input type (e.g., text, email, etc.)
  name: string; // Name attribute for the input
  value: string; // Current value of the input
  placeholder?: string; // Placeholder text
  error?: string; // Error message
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
};

const Input: React.FC<InputFieldProps> = ({
  label,
  type = 'text' ,
  name,
  value,
  placeholder,
  error,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 font-bold mb-2"
      >
        {label}
      </label>
      <div className="relative group">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full bg-transparent text-gray-800 font-semibold placeholder-gray-400 border-2 border-transparent rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          group-hover:border-gray-300 transition-all duration-300`}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  
  );
};

export default Input;
