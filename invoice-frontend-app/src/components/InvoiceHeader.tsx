import React from 'react';
import Input from "../components/re-useable/input"
import type {Props} from "../types/function"
import { useAuth } from '../api/contextApi';


const InvoiceHeader: React.FC<Props> = ({
  onChange,
  error,
  values,
}) => {
  const {user} = useAuth()
  return (
    <>
 
      <img src={values.companyLogo} alt="Company Logo" />
      
     <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
      
  <div className="flex items-center gap-4">
 
 
  
    <div className="text-6xl text-orange-500 font-bold">
   {/* <Input
        name="companyLogo"
        type="file"
        value={values.companyLogo}
        placeholder="Upload company ogo"
        error={error?.companyLogo}
       onChange={onChange}
      /> */}
    </div>
    <div>
      <p className="text-xl font-semibold text-gray-900">
      <Input
        name="companyName"
        type="text"
        value={values.companyName}
        placeholder="Enter company name"
        error={error?.companyName}
       onChange={onChange}
      />
      </p>
      <p className="text-sm text-gray-600">
      <Input
        name="companyWebsite"
        type="url"
        value={values.companyWebsite}
        placeholder="Enter company website"
      //  label="Company Website"
        error={error?.companyWebsite}
     onChange={onChange}
      />
      </p>
      <p className="text-sm text-gray-600">
       <Input
        name="companyEmail"
        type="email"
        value={values.companyEmail=user.email}
        placeholder="Enter company email"
       // label="Company Email"
        error={error?.companyEmail}
       onChange={onChange}
      />
      </p>
      <p className="text-sm text-gray-600">
     <Input
        name="companyNumber"
        type="tel"
        value={values.companyNumber}
        placeholder="Enter company phone number"
      label="Company Number"
        error={error?.companyNumber}
       onChange={onChange}
      />
      </p>
    </div>
  </div>

  {/* <!-- Right Section: Business Details --> */}
  <div className="text-right">
    <p className="text-sm text-gray-900 font-medium">
    <Input
        name="companyAddress"
        type="text"
        value={values.companyAddress}
        placeholder="Enter Company's address"
      //  label="Company's Address"
        error={error?.companyAddress}
      onChange={onChange}
      />
    </p>
    <p className="text-sm text-gray-600">
     <Input
        name="streetAddress"
        type="text"
        value={values.streetAddress}
        placeholder="Enter Street's address"
       // label="Street's Address"
        error={error?.streetAddress}
      onChange={onChange}
      />
    </p>
  </div>
</div>


    </>
  );
};

export default InvoiceHeader;

