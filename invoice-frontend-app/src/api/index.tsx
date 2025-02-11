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
}
export type invoicesResponse = {
  message: string;
  invoices: invoiceType[] | [];
};
export type invoiceResponse = {
  message: string;
  invoice: invoiceType;
};

const base_host = "https://invoice-app-9k8g.onrender.com/";
const apiClient = axios.create({
  baseURL: base_host,
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

export const getInvoice = async (email: string) => {
  try {
    const response = await apiClient.get<invoicesResponse>(
      `${base_host}google/get-invoices?companyEmail=${email}`
    );

    if (!response.data.invoices || response.data.invoices.length === 0) {
      throw new Error("No invoices found");
    }

    console.log("Invoices:", response.data.invoices);
    if(response.status === 200){
      toast.success(response.data.message, {
     position: "top-right",
     autoClose: 5000,
   });
   }
    return response.data.invoices;
  } catch (error: any) {
    console.error("Invoice fetch error:", error.message);
    toast.error(error.response?.data?.message || "No invoices found", {
      position: "top-right",
      autoClose: 5000,
    });
    return [];
  }
};


export const getInvoiceById = async (invoiceId: string) => {
  try {
    const response = await apiClient.get<invoiceResponse>(
      `${base_host}google/get-invoice/${invoiceId}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch invoice");
    }

    if (!response.data.invoice) {
      throw new Error("Invoice data is empty");
    }

    console.log("Fetched Invoice:", response.data.invoice);
    if(response.status === 200){
      toast.success(response.data.message, {
     position: "top-right",
     autoClose: 5000,
   });
   }

    return response.data.invoice;
  } catch (error: any) {
    console.error("Fetch invoice error:", error.message);
    toast.error(
      error.response?.data?.message || "Failed to fetch invoice",
      { position: "top-right", autoClose: 5000 }
    );
    return null;
  }
};


export const createInvoice = async (data: invoiceType) => {
  try {
    const response = await apiClient.post<authResponse>(
      `${base_host}google/create-invoice`,
      data
    );
    if(response.status === 201){
      toast.success(response.data.message, {
     position: "top-right",
     autoClose: 5000,
   });
   }
    console.log(response);
    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message, {
      position: "top-right",
      autoClose: 5000,
    });
  }
};

export const signApi = async (data: auth) => {
  try {
    const response = await apiClient.post<authResponse>(
      `${base_host}ast/user/signup`,
      data
    );
    if(response.status === 200){
       toast.success(response.data.message, {
      position: "top-right",
      autoClose: 5000,
    });
    }
    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message, {
      position: "top-right",
      autoClose: 5000,
    });
    console.log(error.message);
  }
};

export const loginApi = async (data: auth) => {
  try {
    const response = await apiClient.post<authResponse>(
      `${base_host}ast/user/login`,
      data
    );
if(response.status === 200 ){
    toast.success(response.data.message, {
      position: "top-right",
      autoClose: 5000,
    });
}
  return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message, {
      position: "top-right",
      autoClose: 5000,
    });
    console.log(error.message);
    return null
  }
};
