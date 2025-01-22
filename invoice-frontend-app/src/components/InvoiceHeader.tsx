import React from 'react';
import Input from "../components/re-useable/input"
import type {Props} from "../types/function"


const InvoiceHeader: React.FC<Props> = ({
  onChange,
  error,
  values,
}) => {
  return (
    <>
 
      <img src={values.companyLogo} alt="Company Logo" />
      {/* <Input
        name="companyLogo"
        type="file"
        value={values.companyLogo}
        placeholder="Upload company ogo"
        error={error?.companyLogo}
       onChange={onChange}
      /> */}
      {/* <Input
        name="companyName"
        type="text"
        value={values.companyName}
        placeholder="Enter company name"
     //   label="Company Name"
        error={error?.companyName}
       onChange={onChange}
      /> */}
      {/* <Input
        name="companyEmail"
        type="email"
        value={values.companyEmail}
        placeholder="Enter company email"
       // label="Company Email"
        error={error?.companyEmail}
       onChange={onChange}
      /> */}
     
      {/* <Input
        name="companyNumber"
        type="tel"
        value={values.companyNumber}
        placeholder="Enter company phone number"
      //  label="Company Number"
        error={error?.companyNumber}
       onChange={onChange}
      /> */}
      {/* <Input
        name="companyWebsite"
        type="url"
        value={values.companyWebsite}
        placeholder="Enter company website"
      //  label="Company Website"
        error={error?.companyWebsite}
     onChange={onChange}
      /> */}
      {/* <Input
        name="companyAddress"
        type="text"
        value={values.companyAddress}
        placeholder="Enter Company's address"
      //  label="Company's Address"
        error={error?.companyAddress}
      onChange={onChange}
      /> */}
      {/* <Input
        name="streetAddress"
        type="text"
        value={values.streetAddress}
        placeholder="Enter Street's address"
       // label="Street's Address"
        error={error?.streetAddress}
      onChange={onChange}
      /> */}

      
     <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
  {/* <!-- Left Section: Logo and Name --> */}
  <div className="flex items-center gap-4">
    {/* <!-- Company Logo --> */}
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
     //   label="Company Name"
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
        value={values.companyEmail}
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
      //  label="Company Number"
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
    <p className="text-sm text-gray-600">
    TAX ID 00XXXXX1234XXX
    </p>
  </div>
</div>


    </>
  );
};

export default InvoiceHeader;

