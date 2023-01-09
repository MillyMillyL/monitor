import React, { useEffect } from "react";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";

const LoggingTableRow = ({ log, index, allOpen }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(allOpen);
  }, [allOpen]);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, px: "15px" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" colSpan={open ? 12 : null}>
          {index + 1}. {log.logDate}
        </TableCell>

        {!open && (
          <TableCell align="left">
            <Typography
              sx={{
                width: 1100,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {JSON.stringify(log)}
            </Typography>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <pre key={log.id}>{JSON.stringify(log, null, 4)}</pre>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default LoggingTableRow;
