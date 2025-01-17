import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import Search from "@/Components/Search";
import Footer from "@/Components/Footer";

const MainPage = () => {
  const [searchBtn, setSearchBtn] = useState<HTMLButtonElement | null>(null);
  const navbarHeight = "5.25rem";

  const searchCloseHandler = () => {
    if (searchBtn === null) return;

    searchBtn.focus();
    setSearchBtn(null);
  };

  return (
    <div
      className="relative bg-neutral-900"
      style={{ minHeight: `calc(100vh - ${navbarHeight})` }}
    >
      <Navbar
        isSearchOpen={searchBtn !== null}
        onSearchOpen={(ref) => setSearchBtn(ref)}
      />

      <div style={{ marginTop: navbarHeight }}>
        <Outlet />
      </div>

      <Footer />

      {searchBtn !== null && <Search onClose={searchCloseHandler} />}
    </div>
  );
};

export default MainPage;
