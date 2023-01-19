import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./loggingTableRow.css";

const LoggingTableRow = ({ log, index, allOpen }) => {
  const [open, setOpen] = useState(false);

  function handleRowOpen() {
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    setOpen(allOpen);
  }, [allOpen]);

  return (
    <div className="subContainer">
      <div className="item">
        <button className="arrowButton" onClick={handleRowOpen}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </button>
      </div>
      <div className={`item ${open && "dateOpen"}`}>{log.logDate}</div>
      <div className={`item log ${open && "detailOpen"}`}>
        {JSON.stringify(log)}
      </div>
      {open && (
        <div className="detail item">
          <p>{JSON.stringify(log, null, 4)}</p>
        </div>
      )}
    </div>
  );
};

export default LoggingTableRow;
