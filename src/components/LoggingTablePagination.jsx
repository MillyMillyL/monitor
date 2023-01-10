import { Button } from "@mui/material";
import React from "react";

const LoggingTablePagination = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
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
        <select>
          <option value="10">10</option>
          <option value="25">20</option>
          <option value="50">30</option>
        </select>
      </span>
    </div>
  );
};

export default LoggingTablePagination;
