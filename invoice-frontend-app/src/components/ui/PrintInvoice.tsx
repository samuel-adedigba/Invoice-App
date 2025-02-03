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
        if (!user) {
          console.error("User is not defined.");
          return;
        }
        if (user.email === email) {
          const invoiceData = await getInvoice(user.email);
          setInvoices(Array.isArray(invoiceData) ? invoiceData : []);
          console.log("Invoices fetched for user:", invoiceData);
        } else if (invoiceId) {
          const data = await getInvoiceById(invoiceId);
          console.log("Invoice by ID fetched:", data);
          setInvoice(data ?? null); 
        }
      } catch (error) {
        console.error("Error fetching invoice(s):", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email, invoiceId, user]);

  if (loading) {
    return <p><Loading overlay={true} size={50} /></p>;
  }
  

  if (!invoiceId && email) {
    return (
      <div className="flex justify-center items-center min-h-screen py-10 ">
      <Navbar />
      <div className="bg-white shadow-lg rounded-xl p-10 w-[800px]">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Invoices for <span className="text-blue-600">{email}</span>
        </h2>
        { invoices.length === 0 ? (
          <p className="text-gray-500">No invoices found.</p>
        ) : (
          <ul className="divide-y">
            {invoices.map((inv) => (
              <li key={inv?.invoiceId} className="py-4 flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Invoice #{inv?.invoiceNumber} - {inv?.recepientName}
                </span>
                <button
                  onClick={() => navigate(`/invoice/${inv?.invoiceId}`)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
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
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center space-x-4">
              <div className="text-orange-600 text-5xl font-bold">A</div>
              <div>
                <h2 className="text-lg font-semibold">
                  {invoice.companyName}
                </h2>
                <p>{invoice.companyEmail}</p>
                <p>{invoice.companyNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p>{invoice.companyAddress}</p>
              <p>{invoice.companyWebsite}</p>
            </div>
          </div>

          <div className="rounded-xl border p-8 mb-10 bg-white">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-gray-600 text-sm">Billed to</h3>
                <h2 className="text-lg font-semibold">
                  {invoice?.recepientName}
                </h2>
                <p>{invoice.recepientEmail}</p>
                <p>{invoice.recepientNumber}</p>
                <p>{invoice.recepientAddress}</p>

                <div className="mt-6">
                  <h3 className="text-gray-600 text-sm">Subject</h3>
                  <h2 className="text-base font-semibold">
                    {" "}
                    {invoice.subject}{" "}
                  </h2>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <h3 className="text-gray-600 text-sm">Invoice Number</h3>
                  <h2 className="text-lg font-semibold">
                    {" "}
                    {invoice.invoiceNumber}
                  </h2>
                </div>
                <div className="mb-4">
                  <h3 className="text-gray-600 text-sm">Reference</h3>
                  <h2 className="text-lg font-semibold">
                    {invoice.reference}
                  </h2>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Invoice Date</h3>
                  <h2 className="text-lg font-semibold">
                  {dayjs(invoice.invoiceDate).format("DD/MM/YYYY")}
                  </h2>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-4">
                  <h3 className="text-gray-600 text-sm">Invoice of </h3>
                  <h1 className="text-3xl font-bold text-orange-600">
                  {Number(invoice?.total || 0).toLocaleString()}

                  </h1>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Due Date</h3>
                  <h2 className="text-lg font-semibold"> {dayjs(invoice.dueDate).format("DD/MM/YYYY")}</h2>
                </div>
              </div>
            </div>
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
                {invoice?.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2">
                      {item.itemName}  <br />  <i>  {item.itemDescription} </i>  </td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{item.price}</td>
                    <td className="py-2"> {Number(item?.amount  || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4 font-semibold from-neutral-600">
              <div className="flex justify-end space-x-28 m-4">
                <span>Subtotal</span>
                <span>  {Number(invoice?.subTotal || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-end space-x-28 m-5">
                <span>Tax (0%)</span>
                <span>  {Number(invoice?.discount || 0).toLocaleString()}</span>
              </div>
              <hr className="my-2 " />
              <div className="flex justify-end space-x-28 font-bold text-lg m-6 ">
                <h1>Total</h1>
                <span> {Number(invoice?.total || 0).toLocaleString()}</span>
              </div>
            </div>
            <div className="">
              <p>{invoice?.compliment}</p>
            </div>
          </div>
          <p className=" text-sm text-gray-600">{invoice.terms}</p>
        </div>
      </div>
      </>
    );
  }
  return <div className="text-center py-10">No invoice found.</div>;
};
export default PrintInvoice;
