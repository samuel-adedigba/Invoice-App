import React, { useState } from "react";
import { useAuth } from "../../api/contextApi";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, CornerUpLeft, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, contextLogout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    contextLogout();
    navigate("/login");
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-3">
      <button
        onClick={() => navigate(-1)}
        className=" text-gray-700 px-3 py-2 rounded-lg  hover:bg-gray-300 transition-all"
      >
        <CornerUpLeft />
      </button>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md flex gap-2 hover:bg-green-600 transition-all"
        >
         <CircleUserRound /> {user?.email || "User"}
        </button>
        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="p-3 border-b border-gray-300">
              <p className="text-sm text-gray-700">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex gap-3 text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-b-lg"
            >
              <LogOut />  Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
