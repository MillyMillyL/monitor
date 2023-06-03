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
            <div className={styles.service}>
              <div
                className={`${styles.status}   ${
                  e.status === 0
                    ? styles.starting
                    : e.status === 1
                    ? styles.online
                    : styles.offline
                }`}
              >
                {e.status === 0
                  ? "starting"
                  : e.status === 1
                  ? "online"
                  : "offline"}
              </div>
              <div
                className={`${styles.circle_parent}   ${
                  e.status === 0
                    ? styles.starting
                    : e.status === 1
                    ? styles.online
                    : styles.offline
                }`}
                key={e.id}
              >
                <div className={styles.circle_child}>{e.serviceName}</div>
              </div>
              <div className={styles.service_info}>
                <div>
                  IP: <span> {e.ipAddress}</span>
                </div>
                <div>
                  Start Time: <span>{e.launchTime}</span>
                </div>
                <div>
                  ID: <span>{e.id}</span>
                </div>
                <div>
                  ContainerId: <span>{e.containerID}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MonitorPage;
