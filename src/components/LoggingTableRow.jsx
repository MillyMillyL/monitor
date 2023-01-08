import React, { useEffect } from "react";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const LoggingTableRow = ({ log, index, allOpen }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(allOpen);
  }, [allOpen]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
          <TableCell
            align="center"
            sx={{
              maxWidth: "150ch", // percentage also works
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {JSON.stringify(log)}
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
    </React.Fragment>
  );
};

export default LoggingTableRow;
