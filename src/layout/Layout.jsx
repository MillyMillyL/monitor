import React from "react";
import { Outlet } from "react-router-dom";
import "./style.css";

import { DrawerSidebar } from "../components";

function Layout() {
  return (
    <>
      <DrawerSidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
