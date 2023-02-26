import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import { toLocalDateTime } from "@/shared/utils";

import "./style.css";

const LoggingRow = ({ log, allOpen }) => {
  const [open, setOpen] = useState(true);

  function handleRowOpen() {
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    setOpen(allOpen);
  }, [allOpen]);

  return (
    <>
      <Box className="log-row-title" onClick={handleRowOpen}>
        {toLocalDateTime(log.logDate)} - {log.loglevel}@{log.environment}
      </Box>
      <Fade in={open} unmountOnExit={true}>
        <Box className="log-row-content">
          <span>{"{"}</span>
          {Object.keys(log).map((key, idx) => (
            <Box key={idx} className="json-kv">
              <span className="json-key">{key}</span> {log[key]}
            </Box>
          ))}
          <span>{"}"}</span>
        </Box>
      </Fade>
    </>
  );
};

export default LoggingRow;
