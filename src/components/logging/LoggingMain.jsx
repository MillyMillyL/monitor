import { useState, useReducer } from "react";
import Box from "@mui/material/Box";

import useFectch from "@/hooks/useFectch";
import {
  initialState as initialLoggingState,
  loggingReducer,
  LOGGING_ACTION,
} from "@/reducer/loggingReducer";
import LoggingToolbar from "./LoggingToolbar";
import LoggingRows from "./LoggingRows";
import LoggingPagination from "./LoggingPagination";

import "./style.css";

export default function LoggingMain() {
  const [state, dispatch] = useReducer(loggingReducer, initialLoggingState);
  const [isLoading, isSuccess, data, error] = useFectch(state);

  const handleLoggingMain = (action) => {
    dispatch(action);
  };

  return isSuccess ? (
    <Box className="log-container">
      <LoggingToolbar state={state} handleToolbar={handleLoggingMain} />

      <LoggingRows data={data} isLoading={isLoading} allOpen={state.allOpen} />

      <LoggingPagination
        pageIndex={state.pageIndex}
        pageSize={state.pageSize}
        handlePagination={handleLoggingMain}
        className="pagination"
      />
    </Box>
  ) : (
    <p>{error?.message}</p>
  );
}
