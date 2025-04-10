import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "./re-useable/Button";
import Loading from "./re-useable/loading";
import { FileDown, PrinterCheck, Send } from "lucide-react";
import { getInvoicePdf, mailInvoice, previewPdf } from "../api";
import type { invoiceType } from "../api";

const ButtonForm = ({ data }: { data: invoiceType }) => {
  const [loading, setLoading] = useState(false);

  const sendAsPDFToEmail = async (data: invoiceType) => {
    try {
      setLoading(true);
      const res = await mailInvoice(data);
      toast.success(res.message || "Invoice sent successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send invoice.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async (data: invoiceType) => {
    try {
      setLoading(true);
      const htmlString = await previewPdf(data);   
      await new Promise((res) => setTimeout(res, 1000)); 
  
      const previewWindow = window.open("", "_blank");
      if (previewWindow) {
        previewWindow.document.open();
        previewWindow.document.write(htmlString); 
        previewWindow.document.close();
        toast.success("Print preview opened.");
        previewWindow.print();
      } else {
        toast.error("Unable to open preview window.");
      }
    } catch (error) {
      toast.error("Printing failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (data: invoiceType) => {
    try {
      setLoading(true);
      const pdfBlob = await getInvoicePdf(data);

      if (pdfBlob.size > 0 && pdfBlob.type === "application/pdf") {

        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Invoice-${data.invoiceNumber}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 500);
  
        toast.success("PDF successfully downloaded.");
      } else {
        toast.error("Invalid PDF response.");
      }
    } catch (error) {
      toast.error("PDF generation failed.");
    } finally {
      setLoading(false);
    }
  };
  
  // const handlePreviewPDF = async (data: invoiceType) => {
  //   try {
  //     setLoading(true);
  //     const pdfBlob = await getInvoicePdf(data);
  //     if (pdfBlob.size > 0 && pdfBlob.type === "application/pdf") {
  //       const url = window.URL.createObjectURL(pdfBlob);
  //       window.open(url, "_blank");
  //       // Optionally, set a timeout before revoking the URL:
  //       setTimeout(() => {
  //         URL.revokeObjectURL(url);
  //       }, 1000);
  //       toast.success("PDF preview opened.");
  //     } else {
  //       toast.error("Invalid PDF response.");
  //     }
  //   } catch (error) {
  //     toast.error("PDF preview failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  return (
    <div className="p-4 space-y-4 mx-auto max-w-fit">
      {loading ? (
       <Loading overlay />
      ) : (
        <div className="flex flex-wrap  gap-4">
          <Button
            text="Send PDF to Email"
            icon={<Send />}
            className="bg-gray-600"
            onClick={() => sendAsPDFToEmail(data)}
            disabled={loading}
          />
          <Button
            text="Print"
            icon={<PrinterCheck size={18} />}
            className="bg-orange-500"
             onClick={() => handlePrint(data)}
         //   onClick={() => handlePreviewPDF(data)}
            disabled={loading}
          />

          <Button
            text="Generate PDF"
            icon={<FileDown size={18} />}
            onClick={() => handleDownloadPDF(data)}
            disabled={loading}
          />
        </div>
      )}
    </div>
  );
};

export default ButtonForm;
