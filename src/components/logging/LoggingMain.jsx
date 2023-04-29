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

  const handleAllOpen = () => {
    dispatch({ type: LOGGING_ACTION.ALL_OPEN });
  };

  const onClickPagePrev = () => {
    dispatch({ type: LOGGING_ACTION.PAGE_PREV });
  };

  const onClickPageNext = () => {
    dispatch({ type: LOGGING_ACTION.PAGE_NEXT });
  };

  const onChagnePageSize = (pageSize) => {
    dispatch({ type: LOGGING_ACTION.PAGE_SIZE, pageSize });
  };

  return isSuccess ? (
    <Box className="log-container">
      <LoggingToolbar allOpen={state.allOpen} handleAllOpen={handleAllOpen} />

      <LoggingRows data={data} isLoading={isLoading} allOpen={state.allOpen} />

      <LoggingPagination
        pageIndex={state.pageIndex}
        onClickPagePrev={onClickPagePrev}
        onClickPageNext={onClickPageNext}
        pageSize={state.pageSize}
        onChagnePageSize={onChagnePageSize}
        className="pagination"
      />
    </Box>
  ) : (
    <p>{error?.message}</p>
  );
}
