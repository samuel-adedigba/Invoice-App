import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { loginApi } from ".";
import Loading from "../components/re-useable/loading";

interface AuthContextType {
  user: any;
  token: string | null;
  contextLogin: (data: { email: string; password: string }) => Promise<void>;
  contextLogout: () => void;
  generateInvoiceNumber: () => string;
  generateReference: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    }

    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const contextLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await loginApi(data);
  
      if (!response || response.status !== 200 || !response.data.token) {
        throw new Error("Invalid credentials or server error");
      }
  
      const user = response.data.user;
      const token = response.data.token;
  
      setToken(token);
      setUser(user);
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("authToken", token);
  
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };
  

  const contextLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  };

  function generateInvoiceNumber() {
    const min = 100000;
    const max = 999999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    const newInvoiceNumber = `INV${number}`;
    return newInvoiceNumber;
  }
  function generateReference() {
    const min = 10000;
    const max = 99999;
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    const newInvoiceNumber = `ref${number}`;
    return newInvoiceNumber;
  }
  if (loading) {
    return <div> <Loading overlay /> </div>; 
  }
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        contextLogout,
        contextLogin,
        generateInvoiceNumber,
        generateReference
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
