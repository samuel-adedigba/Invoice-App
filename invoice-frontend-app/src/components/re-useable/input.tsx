import React from 'react';
type InputFieldProps = {
  label?: string;
  type?: string;
  name: string; 
  value: string | number; 
  placeholder?: string; 
  error?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
  className?:string
};

const Input: React.FC<InputFieldProps> = ({
  label,
  type = 'text' ,
  name,
  value,
  placeholder,
  error,
  onChange,
  className,
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
