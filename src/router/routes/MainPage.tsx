import { Outlet } from "react-router-dom";
import Navbar from "@/Components/Navbar";

const MainPage = () => (
  <div className="min-h-screen bg-neutral-900">
    <Navbar />

    <div className="mt-[5.25rem]">
      <Outlet />
    </div>
  </div>
);

export default MainPage;
