import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import "./style.css";

const LoggingTableRow = ({ log, allOpen }) => {
  const [open, setOpen] = useState(false);

  function handleRowOpen() {
    setOpen((prev) => !prev);
  }

  useEffect(() => {
    setOpen(allOpen);
  }, [allOpen]);

  return (
    <div className="">
      <Box component="div" className="Log" onClick={handleRowOpen}>
        {log.logDate} - {log.loglevel}:{log.environment}:{log.service}:
        {log.category}
      </Box>
      <Fade in={open} unmountOnExit={true}>
        <pre>{JSON.stringify(log, null, 4)}</pre>
      </Fade>
    </div>
  );
};

export default LoggingTableRow;
