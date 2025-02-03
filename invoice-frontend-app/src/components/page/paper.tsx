import React, { useState } from "react";
import InvoiceHeader from "../InvoiceHeader";
import RecepientDetails from "../RecepientDetails";
import InvoiceDetails from "../InvoiceDetails";
import Footer from "../footer";
import InvoiceItem from "../InvoiceItem";
import { createInvoice } from "../../api";
import type {invoiceType} from "../../api"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/contextApi";
import Navbar from "../re-useable/navBar";

const InvoiceForm = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState<invoiceType>({
    companyName: "",
  companyEmail: "",
  companyNumber: 0,
  companyWebsite: "",
  companyAddress: "",
  streetAddress: "",
  recepientNumber: 0,
  recepientName: "", 
  recepientEmail: "",
  recepientAddress: "",
  subject: "",
  invoiceNumber: "",
  reference: "",
  invoiceDate: "",
  dueDate: "",
  items: [
    {
      id: 1,
      itemName: "",
      itemDescription: "",
      quantity: 0,
      price: 0,
      amount: 0,
    },
  ],
  terms: "",
compliment: "",
total: 0,
subTotal: 0,
discount: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log({ [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log({ [key]: value });
  };
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.companyName)
      newErrors.companyName = "Company name is required.";
    if (!formData.companyEmail)
      newErrors.companyEmail = "Company email is required.";
    if (!formData.recepientEmail)
      newErrors.recepientEmail = "Recepient Email is required.";
    if (!formData.recepientName)
      newErrors.recepientName = "Recepient name is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return
    } 
    if(user.email) {
     createInvoice(formData)
      console.log("Form Submitted:", formData);
      navigate("/dashboard")
      console.log("email auth", user.email)
    } else{
      console.log("login first")
      navigate("/login")
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <Navbar />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Create Invoice
          </h1>

          <InvoiceHeader
            onChange={handleOnchange}
            values={formData}
            error={errors}
          />

          <RecepientDetails
            onChange={handleOnchange}
            values={formData}
            error={errors}
          />

          <InvoiceDetails
            onChange={handleOnchange}
            values={formData}
            error={errors}
          />

          <InvoiceItem
            items={formData.items}
            onItemsChange={(updatedItems) =>
              handleFormChange("items", updatedItems)
            }
            onChange={handleOnchange}
            values={formData}
          />
          <Footer onChange={handleOnchange} values={formData} error={errors} />

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
