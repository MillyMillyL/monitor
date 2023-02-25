import { useEffect, useState, useRef } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";

import { throttle } from "@/shared/utils";
import { fetchLoggingToJson } from "@/api/loggingApi";

import LoggingRow from "./LoggingRow";
import LoggingPagination from "./LoggingPagination";
import "./style.css";
import useFectch from "@/hooks/useFectch";

export default function LoggingTable() {
  const [allOpen, setAllOpen] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const [isLoading, isSuccess, data, error] = useFectch({
    pageIndex,
    pageSize,
  });

  const toolbar = useRef();
  const paginationref = useRef();

  const [contentHeight, setContentHeight] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      var h = document.documentElement.offsetHeight - 40 - 64 - 100;
      if (isNaN(h)) h = 0;
      setContentHeight(h);
    }

    window.addEventListener("resize", throttle(handleResize));

    handleResize();

    return () => window.removeEventListener("resize", throttle(handleResize));
  }, [data]);

  const handleAllOpen = () => {
    setAllOpen((pre) => !pre);
  };

  return isLoading ? (
    <Box>
      <CircularProgress />
    </Box>
  ) : (
    <Box className="log-container">
      <Toolbar className="toolbar" ref={toolbar}>
        <Typography variant="h4">Logging</Typography>
        <FormControlLabel
          control={<Switch />}
          label="Unfold All"
          onChange={handleAllOpen}
          checked={allOpen}
        />
      </Toolbar>

      <Box className="log-rows">
        {data.map((log) => (
          <LoggingRow key={log.id} log={log} allOpen={allOpen} />
        ))}
      </Box>

      <LoggingPagination
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        ref={paginationref}
        className="pagination"
      />
    </Box>
  );
}
