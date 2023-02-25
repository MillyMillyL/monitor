import React from "react";
import { Box } from "@mui/system";

import "./style.css";

const LoggingPagination = React.forwardRef(
  ({ pageIndex, setPageIndex, pageSize, setPageSize }, ref) => {
    const pageSizeOptions = [50, 100, 200, 300];

    const onClickNextPage = () => {
      setPageIndex((prev) => prev + 1);
    };
    const onClickPrevPage = () => {
      setPageIndex((prev) => prev - 1);
    };

    const handlePageSizeChange = (e) => {
      setPageSize(e.target.value);
      setPageIndex(1);
    };

    return (
      <Box className="pagination" ref={ref}>
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
  }
);

export default LoggingPagination;
