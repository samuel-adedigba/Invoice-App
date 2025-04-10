import React, { useState, useEffect } from "react";
import type { auth } from "../../api";
import Loading from "../re-useable/loading";
import { useAuth } from "../../api/contextApi";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const { contextLogin, user } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<auth>({ email: "", password: "" });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await contextLogin(form);
    } catch (error) {
      console.error("Login failed:", error);
      setErrors((prev) => ({ ...prev, email: "Invalid credentials" }));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user?.email) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
    <div className="w-full  max-w-xs md:max-w-md bg-white rounded-lg shadow-lg  p-4">
      <div className="flex justify-center pt-6 px-6 ">
        <div className="w-40 h-40 bg-green-300 rounded-full flex items-center justify-center">
          <img src="../images/invoice.png" alt="Illustration" className="rounded-full" />
        </div>
      </div>
      <div className="p-6">
        <div className="text-center text-gray-700 mb-4">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4" >  Welcome Back! </h1>
         <span className="text-lg" >We missed you </span>
         </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" value={form.email} placeholder="Company / Business Email" onChange={handleOnchange} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          <input name="password" type="password" value={form.password} placeholder="Password" onChange={handleOnchange} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          <div className="flex justify-between">
            <a href="/" className="text-base text-green-600 hover:none"> Sign up</a>
            {/* <a href="#" className="text-sm text-green-600 hover:underline">Reset Password</a> */}
            </div>
          <div className="flex justify-end"></div>
          <button type="submit" className="w-full text-lg bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        {loading &&  <Loading overlay />}
      </div>
    </div>
  </div>
  );
};

export default Login;


