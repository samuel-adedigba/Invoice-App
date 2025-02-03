import PrintInvoice from "../ui/PrintInvoice";
import { useAuth } from "../../api/contextApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../re-useable/navBar";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    localStorage.getItem("userData");
  })

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div>
        <Navbar />
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome, <span className="text-green-600">{user?.email}</span>!
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigate("/create-invoice")}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          >
            Create Invoice
          </button>
          
        </div>
        <PrintInvoice email={user?.email} />
      </div>
    </div>
  );
};

export default Dashboard;
