import React from "react";
import { Box } from "@mui/system";

import { LOGGING_ACTION } from "@/reducer/loggingReducer";

import "./style.css";

const LoggingPagination = ({ pageIndex, pageSize, handlePagination }) => {
  const pageSizeOptions = [50, 100, 200, 300];

  const onClickPrevPage = () => {
    handlePagination({ type: LOGGING_ACTION.PAGE_PREV });
  };

  const onClickNextPage = () => {
    handlePagination({ type: LOGGING_ACTION.PAGE_NEXT });
  };

  const handlePageSizeChange = (e) => {
    handlePagination({
      type: LOGGING_ACTION.PAGE_SIZE,
      pageSize: e.target.value,
    });
  };

  return (
    <Box className="pagination">
      {pageIndex > 0 && (
        <button onClick={onClickPrevPage} className="button">
          {"<<"}
        </button>
      )}
      <span>{pageIndex}</span>
      <button className="button" onClick={onClickNextPage}>
        {">>"}
      </button>

      <select onChange={handlePageSizeChange} value={pageSize}>
        {pageSizeOptions.map((_pageSize) => (
          <option key={_pageSize}>{_pageSize}</option>
        ))}
      </select>
    </Box>
  );
};

export default LoggingPagination;
