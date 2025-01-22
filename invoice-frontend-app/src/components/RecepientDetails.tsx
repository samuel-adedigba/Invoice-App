import React from 'react';
import Input from "../components/re-useable/input"
import type {Props} from "../types/function"


const RecepientDetails: React.FC<Props> = ({
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
        name="recepientName"
        type="text"
        value={values.recepientName}
        placeholder="Enter Receipient Company's name"
        //label="Company Name"
        error={error?.recepientName}
       onChange={onChange}
      />
      <Input
        name="recepientEmail"
        type="email"
        value={values.recepientEmail}
        placeholder="Enter company email"
      //  label="Company Email"
        error={error?.recepientEmail}
       onChange={onChange}
      />
     
      <Input
        name="recepientNumber"
        type="tel"
        value={values.recepientNumber}
        placeholder="Enter company phone number"
        //label="Company Number"
        error={error?.recepientNumber}
       onChange={onChange}
      />
      <Input
        name="recepientAddress"
        type="text"
        value={values.recepientAddress}
        placeholder="Enter Company's address"
       // label="Company's Address"
        error={error?.recepientAddress}
      onChange={onChange}
      />
      <Input 
        name="recepientStreetAddress"
        type="text"
        value={values.recepientStreetAddress}
        placeholder="Enter Street's address"
       // label="Street's Address"
        error={error?.recepientStreetAddress}
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

    </>
  );
};

export default RecepientDetails;

