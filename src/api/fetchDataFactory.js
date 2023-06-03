import { cst_LOGGING, cst_MONITOR } from "../shared/consts";
import { fetchLoggingData } from "./loggingApi";
import { fetchMonitorData } from "./monitorApi";

export function fetchDataFactory(requestBody, requestPage) {
  switch (requestPage) {
    default:
      throw new Error("invalid requestPage");
    case cst_LOGGING:
      return fetchLoggingData(requestBody);

    case cst_MONITOR:
      return fetchMonitorData(requestBody);
  }
}
