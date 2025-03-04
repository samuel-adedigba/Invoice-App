import React, { useEffect, useState } from "react";
import { getInvoice, getInvoiceById } from "../../api";
import type { invoiceType } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../api/contextApi";
import Loading from "../re-useable/loading";
import Navbar from "../re-useable/navBar";
import dayjs from "dayjs"

const PrintInvoice = ({ email }: { email?: string }) => {
  const [invoices, setInvoices] = useState<invoiceType[]>([]);
  const [invoice, setInvoice] = useState<invoiceType | null>(null);
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user) return;
        if (user.email === email) {
          const invoiceData = await getInvoice(user.email);
          setInvoices(Array.isArray(invoiceData) ? invoiceData : []);
        } else if (invoiceId) {
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

  if (loading) return <Loading overlay={true} size={50} />;
  
  if (!invoiceId && email) {
    return (
      <div className="flex flex-col items-center min-h-screen p-4">
      <Navbar />
      <div className="bg-gray-50 shadow-xl rounded-xl p-10 w-full max-w-lg sm:max-w-2xl">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 ">
          Invoices for   <span className="text-blue-600">{email}</span>
        </h2>
        { invoices.length === 0 ? (
          <p className="text-gray-500">No invoice found.</p>
        ) : (
          <ul className="divide-y ">
            {invoices.map((inv) => (
              <li key={inv?.invoiceId} className="py-4 flex justify-between items-center gap-4 flex-col sm:flex-row">
                <span className="text-gray-700 text-sm sm:text-base font-medium">
                  Invoice #{inv?.invoiceNumber} - {inv?.recepientName}
                </span>
                <button
                  onClick={() => navigate(`/invoice/${inv?.invoiceId}`)}
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg  text-xs sm:text-sm hover:bg-gray-600 transition"
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    );
  }

  if (invoice) {
    return ( 
<>
  <Navbar />
  <div className="flex justify-center items-center min-h-screen py-10 px-4 mt-8 ">
    <div
      className="bg-slate-50 shadow-lg rounded-xl p-4 md:p-10"
      style={{
        width: "100%", // Full width on small screens
        maxWidth: "794px", // A4 width on larger screens
        height: "auto", // A4 height
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
              <h3 className="text-gray-600 text-sm">Invoice of </h3>
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
            <span>{Number(invoice?.subTotal || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-end space-x-20 md:space-x-28 m-5">
            <span>Tax (0%)</span>
            <span>{Number(invoice?.discount || 0).toLocaleString()}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-end space-x-20 md:space-x-28 font-bold text-lg m-6">
            <h1>Total</h1>
            <span>{Number(invoice?.total || 0).toLocaleString()}</span>
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
</>
    );
  }
  return <div className="text-center py-10">No invoice found.</div>;
};
export default PrintInvoice;
