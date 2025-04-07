import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../re-useable/DataTable";
import { getInvoice, invoiceType } from "../../api";
import Button from "../re-useable/Button";

type Props = {
  email: string;
};

export default function InvoiceListTable({ email }: Props) {
  const navigate = useNavigate();

  const fetchData = async (pageIndex: number) => {
    const pageSize = 10; // or however you want to fix it
    const result = await getInvoice(email, pageIndex + 1, pageSize);
    return {
      items: result?.invoices ?? [],
      total: result?.total_invoice ?? 0,
    };
  };
  
  

  const columns: ColumnDef<invoiceType>[] = [
    {
      accessorKey: "recepientName",
      header: "Name",
      cell: (props) => <span className="text-base">{props.row.original.recepientName}</span>,
    },
    {
      accessorKey: "invoiceId",
      header: "",
      cell: (props) => {
        const { invoiceId } = props.row.original;
        return (
          <span className="text-base">
            <Button text="View details" onClick={() => navigate(`/invoice/${invoiceId}`)} /> 
          </span>
        );
      },
    },
  ];

  return (
    <>
    <div className="w-full scrollbar-hide overflow-auto">
      <DataTable<invoiceType>
        columns={columns}
        fetchData={fetchData}
        initialPageSize={5}
      />
    </div>
    </>
  );
}
