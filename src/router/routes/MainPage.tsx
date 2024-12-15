import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import Search from "@/Components/Search";

const MainPage = () => {
  const [searchBtn, setSearchBtn] = useState<HTMLButtonElement | null>(null);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar
        isSearchOpen={searchBtn !== null}
        onSearchOpen={(ref) => setSearchBtn(ref)}
      />

      <div className="mt-[5.25rem]">
        <Outlet />
      </div>
      {searchBtn !== null && <Search />}
    </div>
  );
};

export default MainPage;
