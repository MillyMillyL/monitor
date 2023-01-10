import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoggingTableRow from "./LoggingTableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";
import LoggingTablePagination from "./LoggingTablePagination";
import DateRangePicker from "./DateRangePicker";

export default function LoggingTable() {
  const [loggingData, setLoggingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allOpen, setAllOpen] = useState(false);
  const [page, setPage] = useState("0");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const loggingEndUrl = "/api/v1/logging";

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

  return isLoading ? (
    <Box>
      <CircularProgress />
    </Box>
  ) : (
    <Paper
      sx={{
        padding: "24px",
        height: "100vh",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">Logging</Typography>
        <FormControlLabel
          control={<Switch />}
          label="Unfold All"
          onChange={handleAllOpen}
          checked={allOpen}
        />
        <DateRangePicker />
      </Toolbar>
      <TableContainer component={Paper} sx={{ height: "80%" }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 67 }} />
              <TableCell style={{ width: 300 }}>Logging Date</TableCell>
              <TableCell style={{ width: 1100 }}>
                Logging Summery - Expand to See Detail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loggingData.map((log, index) => (
              <LoggingTableRow
                key={log.id}
                log={log}
                index={index}
                allOpen={allOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LoggingTablePagination
        page={page}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </Paper>
  );
}
