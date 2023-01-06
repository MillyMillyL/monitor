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
import { Typography } from "@mui/material";

export default function LoggingTable() {
  const [loggingData, setLoggingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = "http://192.168.1.161:7003/api/v1/logging";
    const requestBody = { pageIndex: 1, pageSize: 10 };

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
  }, []);

  return isLoading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={{ width: "100%" }}>
      <Toolbar>
        <Typography variant="h2">Logging</Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="center">Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loggingData.map((log) => (
              <LoggingTableRow key={log.id} log={log} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
