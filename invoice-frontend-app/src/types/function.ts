export type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: any
  values: any
};

// export type InputFieldProps = {
//   label?: string; // Label for the input
//   type?: string; // Input type (e.g., text, email, etc.)
//   name: string; // Name attribute for the input
//   value: string; // Current value of the input
//   placeholder?: string; // Placeholder text
//   error?: string; // Error message
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
// };