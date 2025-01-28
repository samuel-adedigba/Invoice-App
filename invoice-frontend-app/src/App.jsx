import './App.css';
import Home from './components/page/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InvoiceForm from './components/page/paper';
import PrintInvoice from './components/ui/PrintInvoice';

function App() {
  return (
    <>
   {/* <Home /> */}
<Router>
  <Routes>
  <Route  path='/'  element={<Home />}   />
   <Route  path='/create-invoice'  element={<InvoiceForm />}   />
   <Route  path='/print-invoice'  element={<PrintInvoice />}   />
   
  </Routes>
</Router>

    </>
   
  );
}

export default App;
