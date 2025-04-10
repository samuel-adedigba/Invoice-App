import { useAuth } from "../../api/contextApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InvoiceListTable from "../InvoiceTable";
import { PenLine } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
    const Email = user.email;
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("userData");
  }, []);

  return (
    <>
      <div className="overflow-auto scrollbar-hide flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-lg p-6 sm:p-8 w-full mx-aut">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 w-fit">
            Welcome, <span className="text-green-600">{user?.email} !</span> 
          </h1>
          <div className="flex mt-4 sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => navigate("/create-invoice")}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 sm:px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 flex gap-2 focus:ring-green-300 transition "
            >
             <PenLine /> Create Invoice
            </button>
          </div>

          <div className="mt-6 mx-auto">
            <InvoiceListTable  email={Email} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
