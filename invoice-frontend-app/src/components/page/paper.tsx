import React, { useState } from "react";
import InvoiceHeader from "../InvoiceHeader";
import RecepientDetails from "../RecepientDetails";
import InvoiceDetails from "../InvoiceDetails";
import Footer from "../footer";
import InvoiceItem from "../InvoiceItem";

const InvoiceForm = () => {
  const initialFormState = {
    companyName: "",
    companyEmail: "",
    companyNumber: "",
    companyWebsite: "",
    companyAddress: "",
    streetAddress: "",
    recipientNumber: "",
    recepientName: "",
    recepientEmail: "",
    recepientAddress: "",
    recepientStreetAddress: "",
    subject: "",
    invoiceNumber: "",
    reference: "",
    invoiceDate: "",
    dueDate: "",
    invoiceValue: "",
    items: [
      {
        id: 0,
        itemName: "",
        itemDescription: "",
        quantity: "",
        price: "",
        amount: "",
      },
    ],
  };
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyNumber: "",
    companyWebsite: "",
    companyAddress: "",
    streetAddress: "",
    recipientNumber: "",
    recepientName: "",
    recepientEmail: "",
    recepientAddress: "",
    recepientStreetAddress: "",
    subject: "",
    invoiceNumber: "",
    reference: "",
    invoiceDate: "",
    dueDate: "",
    invoiceValue: "",
    items: [
      {
        id: 1,
        itemName: "",
        itemDescription: "",
        quantity: "",
        price: "",
        amount: "",
      },
    ],
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

    // Validate form data
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
    } else {
      console.log("Form Submitted:", formData);
      resetForm();
    }
  };
  const resetForm = () => {
    setFormData(initialFormState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
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
