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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function LoggingTable() {
  const [loggingData, setLoggingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allOpen, setAllOpen] = useState(false);

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

  const handleAllOpen = () => {
    setAllOpen((pre) => !pre);
  };

  return isLoading ? (
    <Box>
      <CircularProgress />
    </Box>
  ) : (
    <Box
      sx={{
        maxWidth: "90%",
        position: "relative",
        overflow: "scroll",
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
      </Toolbar>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Logging Date</TableCell>
              <TableCell align="center">
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
    </Box>
  );
}
