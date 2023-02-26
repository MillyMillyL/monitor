import React from "react";
import { Box } from "@mui/system";

import "./style.css";

const LoggingPagination = ({
  pageIndex,
  onClickPagePrev,
  onClickPageNext,
  pageSize,
  onChagnePageSize,
}) => {
  const pageSizeOptions = [50, 100, 200, 300];

  const onClickPrevPage = () => {
    onClickPagePrev();
  };

  const onClickNextPage = () => {
    onClickPageNext();
  };

  const handlePageSizeChange = (e) => {
    onChagnePageSize(e.target.value);
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
