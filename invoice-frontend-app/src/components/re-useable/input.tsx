import React, { useEffect, useMemo, useState } from 'react';
type InputFieldProps = {
  label?: string;
  type?: string;
  name: string; 
  value: string | number; 
  placeholder?: string; 
  error?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?:string
  disabled? : boolean
  suggestions?: string[]; 
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
  disabled = false,
  suggestions = [],
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const filteredSuggestions = useMemo(() => {
    if (typeof value === 'string' && value.length > 0) {
      return suggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      );
    }
    return [];
  }, [value, suggestions]);

  useEffect(() => {
    if (filteredSuggestions.length > 0 && isFocused) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [filteredSuggestions, isFocused, value]);

  const handleSelect = (suggestion: string) => {
    if (suggestion !== value) {
      const fakeEvent = {
        target: {
          name,
          value: suggestion,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
  
      onChange?.(fakeEvent);
      setShowSuggestions(false);
    }
  };
  
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 font-bold mb-2"
      >
        {label}
      </label>
      <div className="relative group">
      {isFocused && value && (
        <div className="absolute -top-6 left-2 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-md z-10">
          {value}
        </div>
      )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
           autoComplete="off"
           onFocus={() => setIsFocused(true)}
           onBlur={() => setIsFocused(false)}
          className={`w-full bg-transparent text-gray-800 font-semibold placeholder-gray-400 border-2 border-transparent rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          group-hover:border-gray-300 transition-all duration-300`}
        />
          {/* {showSuggestions && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-md">
          {filteredSuggestions.map((s, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelect(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )} */}
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
