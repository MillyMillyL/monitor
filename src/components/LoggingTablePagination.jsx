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
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <span>Show rows</span>
      <select onChange={handleChangeRowsPerPage}>
        {rowsPerPageOptions.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>

      {page != 0 && (
        <button onClick={handlePrevPage} style={{ backgroundColor: "white" }}>
          Prev Page
        </button>
      )}
      <span>You are at page {(parseInt(page) + 1).toString()}</span>
      <button onClick={handleNextPage} style={{ backgroundColor: "white" }}>
        Next Page
      </button>
    </div>
  );
};

export default LoggingTablePagination;
