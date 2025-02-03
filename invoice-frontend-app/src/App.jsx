import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceForm from './components/page/paper';
import PrintInvoice from './components/ui/PrintInvoice';
import Login from './components/page/Login';
import SignUp from './components/page/SignUp';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './components/page/Dashboard';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
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
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-invoice" element={<ProtectedRoute><InvoiceForm /></ProtectedRoute>} />
        <Route path="/invoice" element={<ProtectedRoute><PrintInvoice /></ProtectedRoute>} />
        <Route path="/invoice/:invoiceId" element={<ProtectedRoute><PrintInvoice /></ProtectedRoute>} />
      </Routes>
    </Router> 
    </div>
  );
}

export default App;
