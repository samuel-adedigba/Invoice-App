import React, { useState } from "react";
import * as Yup from "yup";
import InvoiceHeader from "../InvoiceHeader"
import RecepientDetails from "../RecepientDetails"
import InvoiceDetails from "../InvoiceDetails"
import Footer from "../footer";
import InvoiceItem from "../InvoiceItem";

const InvoiceForm = () => {
  // Define Yup validation schema
  const invoiceSchema = Yup.object().shape({
    // companyName: Yup.string().required("Company name is required"),
    // invoiceNumber: Yup.string().required("Invoice number is required"),
    // invoiceDate: Yup.date()
    //   .required("Invoice date is required")
    //   .typeError("Invalid date"),
    // dueDate: Yup.date().required("Due date is required").typeError("Invalid date"),
    // itemName: Yup.string().required("Item name is required"),
    // quantity: Yup.number()
    //   .required("Quantity is required")
    //   .positive("Must be greater than 0")
    //   .integer("Must be a whole number"),
    // rate: Yup.number().required("Rate is required").positive("Must be greater than 0"),
    // companyLogo: Yup.string().required("Company logo is required"),
    //   companyName: Yup.string().required("Company name is required"),
    //   companyEmail: Yup.string().email("Invalid email").required("Company email is required"),
    //   companyNumber: Yup.string().required("Company hotline is required"),
    //   companyWebsite: Yup.string().url("Invalid URL").required("Company website is required"),
    //   recipientAddress: Yup.string().required("Recipient address is required"),
    //   recipientEmail: Yup.string().email("Invalid email").required("Recipient email is required"),
    //   recipientNumber: Yup.string().required("Recipient phone number is required"),
    // taxRate: Yup.number()
    //   .required("Tax rate is required")
    //   .min(0, "Cannot be negative")
    //   .max(100, "Cannot exceed 100%"),
  });

const [formData, setFormData] = useState({
  companyName: '',
  companyEmail: '',
  companyNumber: '',
  companyWebsite: '',
  companyAddress: '',
  streetAddress: '',
  recipientNumber: '',
  recepientName: '',
  recepientEmail:'',
  recepientAddress: '',
  recepientStreetAddress: '',
  subject: "",
  invoiceNumber:"",
  reference: '',
  invoiceDate:'',
  dueDate:'',
  invoiceValue: '',

});
const [errors, setErrors] = useState<Record<string, string>>({});


const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  console.log( {[name]:value })
  // Clear error when user starts typing
  setErrors((prev) => ({ ...prev, [name]: '' }));
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Validate form data
  const newErrors: Record<string, string> = {};

  if (!formData.companyName) newErrors.companyName = 'Company name is required.';
  if (!formData.companyEmail) newErrors.companyEmail = 'Company email is required.';
  // if (!formData.productDescription)
  //   newErrors.productDescription = 'Product description is required.';
  // if (!formData.productQuantity || isNaN(Number(formData.productQuantity)))
  //   newErrors.productQuantity = 'Product quantity must be a valid number.';
  //Add more validation logic as needed

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
  } else {
    console.log('Form Submitted:', formData);
    
  }
};

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
<form
onSubmit={handleSubmit}
>
        <h1 className="text-2xl font-semibold text-center mb-6">Create Invoice</h1>

              <InvoiceHeader
              onChange={handleOnchange}
              values={formData }
                error={errors}

              />

             <RecepientDetails
              onChange={handleOnchange}
              values={formData }
                error={errors}
              />

              <InvoiceDetails
                onChange={handleOnchange}
                values={formData }
                  error={errors}
              />

              <InvoiceItem
              onChange={handleOnchange}
              values={formData }
                error={errors}
              />

              <Footer
              onChange={handleOnchange}
              values={formData }
                error={errors}
              />


         

            

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Create Invoice
              </button>
         
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
