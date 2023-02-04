import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.css";

import { DrawerSidebar } from "../components";

function Layout() {
  return (
    <div className="container">
      <nav>
        <DrawerSidebar />
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
