import React from 'react';
import Input from "../components/re-useable/input"
import type {Props} from "../types/function"



const InvoiceDetails: React.FC<Props> = ({
  onChange,
  error,
  values,
}) => {
  return (
    <>
 
     <div> 
    
      <Input
        name="invoiceNumber"
        type="text"
        value={values.invoiceNumber}
        placeholder=" Invoice Number: INV-057 "
        //label="Company Name"
        error={error?.invoiceNumber}
       onChange={onChange}
      />
      <Input
        name="reference"
        type="text"
        value={values.reference}
        placeholder=" #AB23231-10"
      //  label="Company Email"
        error={error?.reference}
       onChange={onChange}
      />
     
      <Input
        name="invoiceDate"
        type="date"
        value={values.invoiceDate}
        placeholder="Enter invoice date"
        //label="Company Number"
        error={error?.invoiceDate}
       onChange={onChange}
      />
      <Input
        name="dueDate"
        type="date"
        value={values.dueDate}
        placeholder="Enter due date"
       // label="Company's Address"
        error={error?.dueDate}
      onChange={onChange}
      />
      <Input 
        name="invoiceValue"
        type="text"
        value=  {values.invoiceValue}
        placeholder="Enter Street's address"
       label="Invoice of ( NGN )"
        error={error?.invoiceValue}
      onChange={onChange}
      />

   <Input
        name="subject"
        type="text"
        value={values.subject}
        placeholder="e.g. Design System"
       // label="Street's Address"
        error={error?.subject}
      onChange={onChange}
      />
 </div>
    </>
  );
};

export default InvoiceDetails;

