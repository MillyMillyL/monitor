import React from "react";
import "./logging.css";
import DrawerSidebar from "../../components/DrawerSidebar";
import LoggingTable from "../../components/LoggingTable";

const Logging = () => {
  return (
    <div className="logging-page">
      <DrawerSidebar />
      <LoggingTable />
    </div>
  );
};

export default Logging;
