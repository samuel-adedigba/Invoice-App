import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signApi, type auth } from "../../api";
import Loading from "../re-useable/loading";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<auth>({ email: "", password: "" });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await signApi(form);
      navigate("/login");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
      <div className="w-full max-w-xs md:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105">
        <div className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-1/2 h-33 bg-transparent rounded-3xl flex items-center justify-center">
               <img src="../images/invoice2.png" alt="Illustration" className="rounded-full" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Join Us
          </h2>
          <p className="text-center text-gray-600">
            Create an account to enjoy all services for free!
          </p>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <input
                name="email"
                type="email"
                value={form.email}
                placeholder="Company / Business Email"
                onChange={handleOnChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                name="password"
                type="password"
                value={form.password}
                placeholder="Password (min 6 characters)"
                onChange={handleOnChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
              disabled={loading}
            >
              {loading ? <Loading overlay size={24} /> : "Sign up"}
            </button>
          </form>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;