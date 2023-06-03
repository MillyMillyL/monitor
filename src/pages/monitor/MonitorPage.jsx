import React, { useState } from "react";
import useFectch from "@/hooks/useFectch";
import { cst_MONITOR } from "@/shared/consts";

import { CircularProgress } from "@mui/material";
import styles from "./MonitorPage.module.css";

function MonitorPage() {
  const [state, setState] = useState(null);
  const [isLoading, isSuccess, data, error] = useFectch(state, cst_MONITOR);

  console.log("monitor", data);
  return (
    <div className={styles.container}>
      <header>
        <h1>Monitor</h1>
      </header>
      <hr />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={styles.servicesContainer}>
          {data.map((e) => (
            <div className={styles.outer}>
              <div className={styles.outerCircle} key={e.id}>
                <div className={styles.innerCircle}>{e.serviceName}</div>
              </div>
              <div>{e.ipAddress}</div>
              <div>{e.launchTime}</div>
              <div>{e.id}</div>
              <div>{e.containerID}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MonitorPage;
