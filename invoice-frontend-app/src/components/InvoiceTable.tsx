import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./re-useable/DataTable";
import { getInvoice, invoiceType } from "../api";
import Button from "./re-useable/Button";
import { useCallback } from "react";

type Props = {
  email: string;
};

export default function InvoiceListTable({ email }: Props) {
  const navigate = useNavigate();

  // const fetchData = async (pageIndex: number) => {
  //   const pageSize = 5; 
  //   const offset = pageIndex * pageSize; 

  //   const result = await getInvoice(email, offset, pageSize);
  //   return {
  //     items: result?.invoices ?? [],
  //     total: result?.total_invoice ?? 0,
  //   };
  // };
  const CACHE_EXPIRATION_TIME = 300000; // 5 minutes

  const fetchData = useCallback(async (pageIndex: number) => {
  const pageSize = 5;
  const offset = pageIndex * pageSize;
  const cacheKey = `invoices_${email}_${offset}`;

  const cached = localStorage.getItem(cacheKey);
  const now = Date.now();

  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (now - parsed.timestamp < CACHE_EXPIRATION_TIME) {
        console.log("✅ Using cached invoices");
        return {
          items: parsed.invoices,
          total: parsed.total,
        };
      }
    } catch (err) {
      console.error("❌ Cache parse error", err);
      // fallback to fetch
    }
  }

  try {
    console.log("🌐 Fetching new invoices from API...");
    const result = await getInvoice(email, offset, pageSize);
    const invoices = result?.invoices ?? [];
    const total = result?.total_invoice ?? 0;

    // Save to cache
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ invoices, total, timestamp: now })
    );

    return { items: invoices, total };
  } catch (err) {
    console.error("🚨 API Error", err);
    return { items: [], total: 0 };
  }
}, [email]);


  const columns: ColumnDef<invoiceType>[] = [
    {
      accessorKey: "recepientName",
      header: "Invoice of",
      cell: (props) => <span className="text-base font-bold">{props.row.original.recepientName}</span>,
    },
    {
      accessorKey: "invoiceValue",
      header: "Created on",
      cell: (props) => {
        const { invoiceDate } = props.row.original;
        return (
      <span className="text-base">{invoiceDate}</span>
        )      }
    },
    {
      accessorKey: "subject",
      header: "subject",
      cell: (props) => {
        const { subject } = props.row.original;
        return (
      <span className="text-base">{subject}</span>
        )      }
    },
    {
      accessorKey: "total",
      header: "Amount",
      cell: (props) => {
        const { total,currency } = props.row.original;
        return (
      <span className="text-base"> {currency} {total}</span>
        )      }
    },
    {
      accessorKey: "invoiceId",
      header: "",
      cell: (props) => {
        const { invoiceId } = props.row.original;
        return (
          <span className="text-base">
            <Button text="View" className="bg-[#25CAB7] border hover:text-white text-[#32272B]  font-medium rounded-lg" onClick={() => navigate(`/invoice/${invoiceId}`)} /> 
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full items-center ">
      <DataTable<invoiceType>
        columns={columns}
        fetchData={fetchData}
        initialPageSize={5}
      />
    </div>
  );
}
