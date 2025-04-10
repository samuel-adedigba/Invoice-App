import React, { useState } from "react";
import InvoiceHeader from "../InvoiceHeader";
import RecepientDetails from "../RecepientDetails";
import InvoiceDetails from "../InvoiceDetails";
import Footer from "../footer";
import InvoiceItem from "../InvoiceItem";
import { createInvoice } from "../../api";
import type { invoiceType } from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/contextApi";
import Navbar from "../re-useable/navBar";
import { toast } from "react-toastify";
import Loading from "../re-useable/loading";

const InvoiceForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
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
    currency: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Updated form data:", formData);
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.companyName)
        newErrors.companyName = "Company name is required.";
      if (!formData.companyEmail)
        newErrors.companyEmail = "Company email is required.";
      if (!formData.companyNumber)
        newErrors.companyNumber = "Company Number is required.";
      if (!formData.companyAddress)
        newErrors.companyAddress = "Company Address is required.";
      if (!formData.recepientEmail)
        newErrors.recepientEmail = "Recepient Email is required.";
      if (!formData.recepientName)
        newErrors.recepientName = "Recepient name is required.";
      if (!formData.recepientAddress)
        newErrors.recepientAddress = "Recepient Address is required.";
      if (!formData.subject) newErrors.subject = "Subject is required.";
      if (!formData.invoiceNumber)
        newErrors.invoiceNumber =
          "Make sure you generate invoice number before you submit.";
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      if (user?.email) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        setErrors({});
        const res = await createInvoice(formData);
        toast.success(res?.message || "Invoice created successfully!");
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <Navbar />
      {loading ? (
        <Loading overlay />
      ) : (
        <>
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
            <form onSubmit={handleSubmit}>
              <div>
                <h1 className="text-2xl font-semibold text-center mb-6">
                Create Invoice
              </h1>
              </div>
              
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
              <Footer
                onChange={handleOnchange}
                values={formData}
                error={errors}
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Create Invoice
              </button>
            </form>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default InvoiceForm;
