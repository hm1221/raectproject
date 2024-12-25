import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
      {/* Navbar Sabit */}
      <Navbar />

      {/* Outlet ile her sayfa içeriği burada değişecek */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
