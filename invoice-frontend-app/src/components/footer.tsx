import React from 'react';
import Input from "../components/re-useable/input"
import type {Props} from "../types/function"


const Footer: React.FC<Props> = ({
  onChange,
  error,
  values,
}) => {
  return (
    <>
      <Input
        name="compliment"
        type="text"
        value={values.compliment}
        placeholder="Thanks for the business."
        error={error?.compliment}
       onChange={onChange}
       suggestions={[
        "Thanks for the business.",
        "We appreciate your prompt payment.",
        "Looking forward to working with you again.",
      ]}
      />
      
      <div className=" text-sm text-gray-600">
         <Input
        name="terms"
        type="text"
        value={values.terms}
        placeholder=" Please pay within 15 days of receiving this invoice"
        label="Terms & Conditions"
        error={error?.terms}
       onChange={onChange}
       suggestions={[
        "Please pay within 7 days.",
        "Please pay within 15 days of receiving this invoice.",
        "Payment is due upon receipt.",
      ]}
      />
      </div>
     
     

    </>
  );
};

export default Footer;

