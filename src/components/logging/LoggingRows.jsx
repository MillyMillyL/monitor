import React from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

import LoggingRow from "./LoggingRow";

export default function LoggingRows({ data, isLoading, allOpen }) {
  return isLoading ? (
    <Box className="log-rows-loading">
      <CircularProgress />
    </Box>
  ) : (
    data && (
      <Box className="log-rows">
        {data.map((log) => (
          <LoggingRow key={log.id} log={log} allOpen={allOpen} />
        ))}
      </Box>
    )
  );
}
