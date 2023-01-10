import { Button } from "@mui/material";
import React from "react";

const LoggingTablePagination = ({ page, setPage, setRowsPerPage }) => {
  const rowsPerPageOptions = [10, 25, 50, 100, 250, 500];

  const handleNextPage = () => {
    setPage((prev) => (parseInt(prev) + 1).toString());
  };
  const handlePrevPage = () => {
    setPage((prev) => (parseInt(prev) - 1).toString());
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value, 10);
    setPage(0);
  };
  return (
    <div>
      {page != 0 && (
        <button onClick={handlePrevPage} style={{ backgroundColor: "white" }}>
          Last Page
        </button>
      )}
      <span>You are at page {(parseInt(page) + 1).toString()}</span>
      <button onClick={handleNextPage} style={{ backgroundColor: "white" }}>
        Next Page
      </button>
      <span>
        Rows per page
        <select onChange={handleChangeRowsPerPage}>
          {rowsPerPageOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default LoggingTablePagination;
