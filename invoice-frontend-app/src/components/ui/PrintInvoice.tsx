import React, { useEffect, useState } from "react";
import {  getInvoiceById } from "../../api";
import type { invoiceType } from "../../api";
import {  useParams } from "react-router-dom";
import { useAuth } from "../../api/contextApi";
import Loading from "../re-useable/loading";
import dayjs from "dayjs"
import ButtonForm from "../ButtonForm";

const PrintInvoice = ({ email }: { email?: string }) => {
  const [invoice, setInvoice] = useState<invoiceType | null>(null);
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user) return;
         if (invoiceId) {
          const data = await getInvoiceById(invoiceId);
          setInvoice(data ?? null);
        }
      } catch (error) {
        throw new Error("Error fetching invoice(s)");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email, invoiceId, user]);

  if (loading) return  <Loading overlay />;

  
  // if (!invoiceId && email) {
  //   return (
  //     <div className="flex flex-col items-center min-h-screen p-4">
  //     <Navbar />
  //     {/* <div className="bg-gray-50 shadow-xl rounded-xl p-10 w-full max-w-lg sm:max-w-2xl">
  //     <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 ">
  //         Invoices for   <span className="text-blue-600">{email}</span>
  //       </h2>
  //       { invoices.length === 0 ? (
  //         <p className="text-gray-500">No invoice found.</p>
  //       ) : (
  //         // <ul className="divide-y ">
  //         //   {invoices.map((inv) => (
  //         //     <li key={inv?.invoiceId} className="py-4 flex justify-between items-center gap-4 flex-col sm:flex-row">
  //         //       <span className="text-gray-700 text-sm sm:text-base font-medium">
  //         //         Invoice #{inv?.invoiceNumber} - {inv?.recepientName}
  //         //       </span>
  //         //       <button
  //         //         onClick={() => navigate(`/invoice/${inv?.invoiceId}`)}
  //         //         className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg  text-xs sm:text-sm hover:bg-gray-600 transition"
  //         //       >
  //         //         View Details
  //         //       </button>
  //         //     </li>
  //         //   ))}
  //         // </ul>        
         
  //       )}
  //     </div> */}
  //      <InvoiceListTable email={Email} />
  //   </div>
  //   );
  // }

  if (invoice) {
    return ( 
<>
  <div className="flex justify-center items-center h-auto overflow-auto scrollbar-hide mb-6 px-4 text-base sm:text-lg ">
    <div
      className="bg-slate-50 shadow-lg rounded-xl p-4 md:p-10"
      style={{
        width: "100%", 
        maxWidth: "794px", 
        height: "auto", 
        overflow: "hidden",
      }}
    >
      {/* Company Details Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-10">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="text-orange-600 text-3xl md:text-5xl font-bold"> </div>
          <div>
            <h2 className="text-lg font-semibold">{invoice.companyName}</h2>
            <p className="text-sm">{invoice.companyEmail}</p>
            <p className="text-sm">{invoice.companyNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">{invoice.companyAddress}</p>
          <p className="text-sm">{invoice.companyWebsite}</p>
        </div>
      </div>

      {/* Invoice Details Section */}
      <div className="rounded-xl border p-4 md:p-8 mb-6 md:mb-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Billed To Section */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-gray-600 text-sm">Billed to</h3>
            <h2 className="text-lg font-semibold">{invoice?.recepientName}</h2>
            <p className="text-sm">{invoice.recepientEmail}</p>
            <p className="text-sm">{invoice.recepientNumber}</p>
            <p className="text-sm">{invoice.recepientAddress}</p>

            <div className="mt-4">
              <h3 className="text-gray-600 text-sm">Subject</h3>
              <h2 className="text-base font-semibold">{invoice.subject}</h2>
            </div>
          </div>

          {/* Invoice Metadata Section */}
          <div className="mb-4 md:mb-0">
            <div className="mb-4">
              <h3 className="text-gray-600 text-sm">Invoice Number</h3>
              <h2 className="text-lg font-semibold">{invoice.invoiceNumber}</h2>
            </div>
            <div className="mb-4">
              <h3 className="text-gray-600 text-sm">Reference</h3>
              <h2 className="text-lg font-semibold">{invoice.reference}</h2>
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Invoice Date</h3>
              <h2 className="text-lg font-semibold">
                {dayjs(invoice.invoiceDate).format("DD/MM/YYYY")}
              </h2>
            </div>
          </div>

          {/* Invoice Total Section */}
          <div className="text-right">
            <div className="mb-4">
              <h3 className="text-gray-600 text-base">Invoice of {invoice?.currency} </h3>
              <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
                {Number(invoice?.total || 0).toLocaleString()}
              </h1>
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Due Date</h3>
              <h2 className="text-lg font-semibold">
                {dayjs(invoice.dueDate).format("DD/MM/YYYY")}
              </h2>
            </div>
          </div>
        </div>

        {/* Items Table Section */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-y-2">
                <th className="text-left py-2">Item Detail</th>
                <th className="text-left py-2">Qty</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.items.map((item, index) => (
                <tr key={index}>
                  <td className="py-2">
                    {item.itemName} <br /> <i>{item.itemDescription}</i>
                  </td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">{item.price}</td>
                  <td className="py-2">{Number(item?.amount || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="text-right mt-4 font-semibold from-neutral-600">
          <div className="flex justify-end space-x-20 md:space-x-28 m-4">
            <span>Subtotal</span>
            <span> {invoice?.currency} {Number(invoice?.subTotal || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-end space-x-20 md:space-x-28 m-5">
            <span>Discount (0%)</span>
            <span>{Number(invoice?.discount || 0).toLocaleString()}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-end space-x-20 md:space-x-28 font-bold text-lg m-6">
            <h1>Total</h1>
            <span> {invoice?.currency} {Number(invoice?.total || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Compliment Section */}
        <div className="mt-4">
          <p className="text-sm">{invoice?.compliment}</p>
        </div>
      </div>

      {/* Terms Section */}
      <p className="text-sm text-gray-600">{invoice.terms}</p>
    </div>
  </div>
  <div className="my-2">
     <ButtonForm data={invoice}  />
  </div>
 
</>
    );
  }
  return <div className="text-center py-10">No invoice found.</div>;
};

export default PrintInvoice;
