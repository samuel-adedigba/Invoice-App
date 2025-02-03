import React from "react";
import Input from "../components/re-useable/input";
import type { Props } from "../types/function";
import { useAuth } from "../api/contextApi";

const InvoiceDetails: React.FC<Props> = ({ onChange, error, values }) => {
  const { generateInvoiceNumber, generateReference } = useAuth();
  const generateAndSetInvoice = () => {
    const invoiceNumber = generateInvoiceNumber();
    onChange({
      target: {
        name: "invoiceNumber",
        value: invoiceNumber,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  const generateAndSetReference = () => {
    const reference = generateReference();
    onChange({
      target: {
        name: "reference",
        value: reference,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };
  return (
    <>
      <div>
        <Input
          name="invoiceNumber"
          type="text"
          value={values.invoiceNumber}
          placeholder="Invoice Number (e.g., INV-123456)"
          error={error?.invoiceNumber}
          onChange={onChange}
        />
        <div className="mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("Generator Clicked!");
              generateAndSetInvoice();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Generate Invoice Number
          </button>
        </div>
        <Input
          name="reference"
          type="text"
          value={values.reference}
          placeholder="Reference (e.g., #AB23231-10)"
          error={error?.reference}
          onChange={onChange}
        />

        <div className="mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("Generator Clicked!");
              generateAndSetReference();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Generate Reference Number
          </button>
        </div>
        <Input
          name="invoiceDate"
          type="date"
          value={values.invoiceDate}
          placeholder="Enter invoice date"
          label="Enter invoice date"
          error={error?.invoiceDate}
          onChange={onChange}
        />
        <Input
          name="dueDate"
          type="date"
          value={values.dueDate}
          placeholder="Enter due date"
          label="Enter due date"
          error={error?.dueDate}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InvoiceDetails;
