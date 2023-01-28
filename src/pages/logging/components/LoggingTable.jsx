import * as React from "react";
import { useEffect, useState, useLayoutEffect } from "react";
import LoggingTableRow from "./LoggingTableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import LoggingTablePagination from "./LoggingTablePagination";
import "../style.css";
import { useRef } from "react";

export default function LoggingTable() {
  const [loggingData, setLoggingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allOpen, setAllOpen] = useState(true);
  const [page, setPage] = useState("0");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const loggingEndUrl = "/api/v1/logging";

  const toolbar = useRef();
  const paginationref = useRef();

  const [contentHeight, setContentHeight] = useState(undefined);

  function throttle(callback, delay = 1000) {
    let shouldWait = false;

    return (...args) => {
      if (shouldWait) return;

      callback(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, delay);
    };
  }

  useEffect(() => {
    function handleResize() {
      var h = document.documentElement.offsetHeight - 40 - 64 - 100;
      // paginationref?.current?.offsetHeight -
      // toolbar?.current?.offsetHeight;
      if (isNaN(h)) h = 0;

      console.log(
        h,
        paginationref?.current?.clientHeight,
        toolbar?.current?.clientHeight
      );

      setContentHeight(h);
    }

    window.addEventListener("resize", throttle(handleResize));

    handleResize();

    return () => window.removeEventListener("resize", throttle(handleResize));
  }, [loggingData]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_MONITOR_BASE_URL}${loggingEndUrl}`;

    const requestBody = {
      pageIndex: (parseInt(page) + 1).toString(),
      pageSize: rowsPerPage,
    };

    async function fetchLogging(url) {
      fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLoggingData(data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    setIsLoading(true);
    fetchLogging(url);
    setIsLoading(false);
  }, [page, rowsPerPage]);

  const handleAllOpen = () => {
    setAllOpen((pre) => !pre);
  };

  // var docWidth = document.documentElement.offsetWidth;

  // [].forEach.call(document.querySelectorAll("*"), function (el) {
  //   if (el.offsetWidth > docWidth) {
  //     console.log(el);
  //   }
  // });

  return isLoading ? (
    <Box>
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <Toolbar className="Toolbar" ref={toolbar}>
        <Typography variant="h4">Logging</Typography>
        <FormControlLabel
          control={<Switch />}
          label="Unfold All"
          onChange={handleAllOpen}
          checked={allOpen}
        />
        {/* <DateRangePicker /> */}
      </Toolbar>

      <div
        style={{ height: contentHeight, overflowY: "auto" }}
        className="table"
      >
        {loggingData.map((log) => (
          <LoggingTableRow key={log.id} log={log} allOpen={allOpen} />
        ))}
      </div>

      <LoggingTablePagination
        page={page}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        ref={paginationref}
        className="pagination"
      />
    </Box>
  );
}
