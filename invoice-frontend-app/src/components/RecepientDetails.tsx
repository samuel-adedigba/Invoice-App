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
      <h3 className="text-gray-600 text-base">Billed to</h3>
      </div>
      <span className="text-lg font-semibold"  >   
         <Input
        name="recepientName"
        type="text"
        value={values.recepientName}
        placeholder="Enter Receipient Company's name"
        //label="Company Name"
        error={error?.recepientName}
       onChange={onChange}
      />
      </span>
     
     <h2   className="text-lg font-semibold" >
       <Input
        name="recepientEmail"
        type="email"
        value={values.recepientEmail}
        placeholder="Enter company email"
      //  label="Company Email"
        error={error?.recepientEmail}
       onChange={onChange}
      />
     </h2>
     
     
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
<h2   className="text-gray-600 text-sm" >
  <Input
        name="subject"
        type="text"
        value={values.subject}
        placeholder="e.g. Design System"
       // label="Street's Address"
        error={error?.subject}
      onChange={onChange}
      />
</h2>


    </>
  );
};

export default RecepientDetails;

