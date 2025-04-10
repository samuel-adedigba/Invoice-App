import { Outlet } from "react-router-dom";
import Navbar from "./navBar";

export default function Layout() {
    return (
      <div className="h-screen w-full flex flex-col">
        <Navbar />
        <div className="mt-[70px] flex-1  overflow-auto scrollbar-hide px-4 py-2">
          <Outlet />
        </div>
      </div>
    );
  }