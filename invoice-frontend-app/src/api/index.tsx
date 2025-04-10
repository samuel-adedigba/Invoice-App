import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export interface auth {
  email: string;
  password: string;
}
export type authResponse = {
  message: string;
  user?: auth;
  token: string | null;
};
type InvoiceItem = {
  id: number;
  itemName: string;
  itemDescription: string;
  quantity: number;
  price: number;
  amount: number;
};
export interface invoiceType {
  invoiceId?: string;
  companyName?: string;
  companyEmail?: string;
  companyNumber?: number;
  companyWebsite?: string;
  companyAddress?: string;
  streetAddress?: string;
  recepientNumber?: number ;
  recepientName?: string;
  recepientEmail?: string;
  recepientAddress?: string;
  recepientStreetAddress?: string;
  subject?: string;
  invoiceNumber?: string;
  reference?: string;
  invoiceDate?: string;
  dueDate?: string;
  invoiceValue?: number;
  items: InvoiceItem[];
  terms?: string;
  compliment?: string;
  total?: number;
  subTotal?: number;
  discount?: number;
  currency?: string;
}
export type invoicesResponse = {
  message: string;
  total_invoice: number;
  current_page: number;
  limit: number;
  total_page: number;
  invoices: invoiceType[] | [];
};
export type invoiceResponse = {
  message: string;
  invoice: invoiceType;
};
const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getInvoice = async (
  email: string,
  offset = 0,
  limit = 5
): Promise<invoicesResponse | null> => {
  try {
    const response = await apiClient.get<invoicesResponse>(
     `google/get-invoices?companyEmail=${email}&offset=${offset}&limit=${limit}`
    );

    const data = response.data;
    if (!data.invoices || data.invoices.length === 0) {
      throw new Error("No invoices found");
    }

    if (response.status === 200) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.warning(data.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    return data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to fetch invoices", {
      position: "top-right",
      autoClose: 3000,
    });
    return null;
  }
};


export const getInvoiceById = async (invoiceId: string) => {
  try {
    const response = await apiClient.get<invoiceResponse>(
      `google/get-invoice/${invoiceId}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch invoice");
    }

    if (!response.data.invoice) {
      throw new Error("Invoice data is empty");
    }
    if(response.status === 200){
      toast.success(response.data.message, {
     position: "top-right",
     autoClose: 3000,
   });
   }
   else {
    toast.warning(response.data.message, {
      position: "top-right",
      autoClose: 3000,
    });
  }
    return response.data.invoice;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to fetch invoice",
      { position: "top-right", autoClose: 3000 }
    );
    return null;
  }
};


export const createInvoice = async (data: invoiceType) => {
  try {
    const response = await apiClient.post<authResponse>(
      `google/create-invoice`,
      data
    );
    return response.data;
  } catch (error: any) {
      throw new Error("Failed to create invoice");      
};
}

export const getInvoicePdf = async (data: invoiceType) => {
  try {
    const response = await apiClient.post(
      `invoice/generate-pdf`,
      data,
      { responseType: "blob" }
    );
    return response.data; 
  } catch (error: any) {
    throw new Error("Failed to generate PDF");
    }
};
export const previewPdf = async (data: invoiceType) => {
  try {
    const response = await apiClient.post(
      "invoice/preview-html",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "text",
      }
    );

    return response.data; 
  } catch (error: any) {
    throw error; 
  }
};

export const mailInvoice = async (data: invoiceType) => {
  try {
    const response = await apiClient.post(
      `invoice/send-invoice`,
      data
    );
    return response.data; 
  } catch (error: any) {
    throw new Error("Failed to send invoice");
  }
};
export const signApi = async (data: auth) => {
  try {
    const response = await apiClient.post<authResponse>(
      `ast/user/signup`,
      data
    );
    if(response.status === 200){
       toast.success(response.data.message, {
      position: "top-right",
      autoClose: 3000,
    });
    }
    else {
      toast.warning(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message, {
      position: "top-right",
      autoClose: 3000,
    });
    console.log(error.message);
  }
};

export const loginApi = async (data: auth) => {
  try {
    const response = await apiClient.post<authResponse>(
      `ast/user/login`,
      data
    );
if(response.status === 200 ){
    toast.success(response.data.message, {
      position: "top-right",
      autoClose: 3000,
    });
}
else {
  toast.warning(response.data.message, {
    position: "top-right",
    autoClose: 3000,
  });
}
  return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message, {
      position: "top-right",
      autoClose: 3000,
    });
    console.log(error.message);
    return null
  }
};
