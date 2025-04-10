import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoiceForm from "./components/page/paper";
import PrintInvoice from "./components/ui/PrintInvoice";
import Login from "./components/page/Login";
import SignUp from "./components/page/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/page/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/re-useable/Layout";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-invoice" element={<InvoiceForm />} />
            <Route path="/invoice/:invoiceId" element={<PrintInvoice />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
