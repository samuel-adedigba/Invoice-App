import PrintInvoice from "../ui/PrintInvoice"; 
import { useAuth } from "../../api/contextApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../re-useable/navBar";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("userData");
  }, []);

  return (
    <>
    <div>
      <Navbar />
    </div>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-4xl min-h-[60vh] mt-10">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Welcome, <span className="text-green-600">{user?.email}</span> !
          </h1>
          <div className="flex mt-4 sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => navigate("/create-invoice")}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 sm:px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition "
            >
              Create Invoice
            </button>
          </div>

          <div className="mt-6">
            <PrintInvoice email={user?.email} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
