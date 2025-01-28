import React, { useEffect } from "react";
import { getInvoice } from "../../api";

const PrintInvoice = () => {

  useEffect(()=>{
    getInvoice()
  })
  return (
    <>
    <div className=" flex justify-center items-center min-h-screen py-10">
      <div
        className="bg-slate-50 shadow-lg rounded-xl p-10"
        style={{
          width: "794px", // A4 width
          height: "auto", // A4 height
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center space-x-4">
            <div className="text-orange-600 text-5xl font-bold">A</div>
            <div>
              <h2 className="text-lg font-semibold">Alvish Baldha</h2>
              <p>www.website.com</p>
              <p>hello@email.com</p>
              <p>+91 00000 00000</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">Business Address</h2>
            <p>City, State, IN - 000 000</p>
            <p>TAX ID 00XXXXX1234X0XX</p>
          </div>
        </div>
  
        {/* Invoice Details Section */}
        <div className="rounded-xl border p-8 mb-10 bg-white">
          <div className="grid grid-cols-3 gap-8">
            {/* Billed To */}
            <div>
              <h3 className="text-gray-600 text-sm">Billed to</h3>
              <h2 className="text-lg font-semibold">Company Name</h2>
              <p>Company Address</p>
              <p>City, Country - 00000</p>
              <p>+0 (000) 123-4567</p>
              <div className="mt-6">
                <h3 className="text-gray-600 text-sm">Subject</h3>
                <h2 className="text-base font-semibold">Design System</h2>
              </div>
            </div>
  
            {/* Invoice Info */}
            <div>
              <div className="mb-4">
                <h3 className="text-gray-600 text-sm">Invoice Number</h3>
                <h2 className="text-lg font-semibold">#AB2324-01</h2>
              </div>
              <div className="mb-4">
                <h3 className="text-gray-600 text-sm">Reference</h3>
                <h2 className="text-lg font-semibold">INV-057</h2>
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Invoice Date</h3>
                <h2 className="text-lg font-semibold">01 Aug, 2023</h2>
              </div>
            </div>
  
            {/* Invoice Total */}
            <div className="text-right">
              <div className="mb-4">
                <h3 className="text-gray-600 text-sm">Invoice of (USD)</h3>
                <h1 className="text-3xl font-bold text-orange-600">$4,950.00</h1>
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Due Date</h3>
                <h2 className="text-lg font-semibold">15 Aug, 2023</h2>
              </div>
            </div>
          </div>
        
  
        {/* Items Table */}
        <table className="w-full border-collapse mt-10">
          <thead>
            <tr className="border-y-2">
              <th className="text-left py-2">Item Detail</th>
              <th className="text-left py-2">Qty</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="py-2">
                <span>Item Name</span>
                <br />
                <span className="text-gray-600 text-sm">Item description</span>
              </td>
              <td className="py-2">1</td>
              <td className="py-2">$3,000.00</td>
              <td className="py-2">$3,000.00</td>
            </tr>
            <tr>
              <td className="py-2">
                <span>Item Name</span>
                <br />
                <span className="text-gray-600 text-sm">Item description</span>
              </td>
              <td className="py-2">1</td>
              <td className="py-2">$1,500.00</td>
              <td className="py-2">$1,500.00</td>
            </tr>

            <tr>
              <td className="py-2">
                <span>Item Name</span>
                <br />
                <span className="text-gray-600 text-sm">Item description</span>
              </td>
              <td className="py-2">1</td>
              <td className="py-2">$1,500.00</td>
              <td className="py-2">$1,500.00</td>
            </tr>

            <tr>
              <td className="py-2">
                <span>Item Name</span>
                <br />
                <span className="text-gray-600 text-sm">Item description</span>
              </td>
              <td className="py-2">1</td>
              <td className="py-2">$1,500.00</td>
              <td className="py-2">$1,500.00</td>
            </tr>
            <tr>
              <td className="py-2">
                <span>Item Name</span>
                <br />
                <span className="text-gray-600 text-sm">Item description</span>
              </td>
              <td className="py-2">1</td>
              <td className="py-2">$1,500.00</td>
              <td className="py-2">$1,500.00</td>
            </tr>
          </tbody>
        </table>
  
        {/* Subtotal, Tax, and Total */}
        <div className="text-right mt-4 font-semibold from-neutral-600">
          <div className="flex justify-end space-x-28 m-4">
            <span>Subtotal</span>
            <span>$4,500.00</span>
          </div>
          <div className="flex justify-end space-x-28 m-5">
            <span>Tax (10%)</span>
            <span>$450.00</span>
          </div>
          <hr className="my-2 " />
          <div className="flex justify-end space-x-28 font-bold text-lg m-6 ">
            <h1 >Total</h1>
            <span>$4,950.00</span>
          </div>
        </div>
  
        {/* Footer Section */}
        <div className="">
          <p>Thanks for the business.</p>

          </div>
</div>
          <p className=" text-sm text-gray-600">
            Terms & Conditions: Please pay within 15 days of receiving this invoice.
          </p>
        
      </div>
    </div>
  </>
  
  
  );
};

export default PrintInvoice;

