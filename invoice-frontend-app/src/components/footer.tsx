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
 
     <div>

     </div>
      <div>
        Billed to :
      </div>
      <Input
        name="compliment"
        type="text"
        value={values.compliment}
        placeholder="Thanks for the business."
        //label="Company Name"
        error={error?.compliment}
       onChange={onChange}
      />
      <Input
        name="terms"
        type="text"
        value={values.terms}
        placeholder=" Please pay within 15 days of receiving this invoice"
        label="Terms & Conditions"
        error={error?.terms}
       onChange={onChange}
      />
     

    </>
  );
};

export default Footer;

