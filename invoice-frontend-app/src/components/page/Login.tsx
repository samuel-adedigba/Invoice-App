import React, { useState, useEffect } from "react";
import type { auth } from "../../api";
import Loading from "../re-useable/loading";
import { useAuth } from "../../api/contextApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed: Invalid credentials");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-center py-6 ">
        <div className="w-40 h-40 bg-green-300 rounded-full flex items-center justify-center">
          <img src="" alt="Illustration" className="rounded-full" />
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Welcome Back!<br /><small>We missed you</small></h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" value={form.email} placeholder="Company / Business Email" onChange={handleOnchange} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          <input name="password" type="password" value={form.password} placeholder="Password" onChange={handleOnchange} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          <div className="flex justify-end"><a href="#" className="text-sm text-green-600 hover:underline">Forgot Password?</a></div>
          <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        {loading && <Loading overlay size={40} />}
      </div>
    </div>
  </div>
  );
};

export default Login;


