import React, { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnectionState,
} from "@microsoft/signalr";
import { CircularProgress } from "@mui/material";

import useFectch from "@/hooks/useFectch";
import styles from "./MonitorPage.module.css";
import { cst_MONITOR } from "@/shared/consts";

function MonitorPage() {
  const [state, setState] = useState(null);
  const [isLoading, isSuccess, data, error] = useFectch(state, cst_MONITOR);
  const [progressValue, setProgressValue] = useState(300);
  const [hubData, setHubData] = useState(null);

  const url = `${import.meta.env.VITE_MONITOR_BASE_URL}/servicesMonitorHub`;

  //signalR hub
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging("warn")
      .build();

    connection
      .start()
      .then(function () {
        console.log("connection started");
        connection.on(
          "ClientServicesMonitorDataUpdate",
          function (servicesMonitorData) {
            // console.log("received hub data", servicesMonitorData);
            setHubData(servicesMonitorData);
          }
        );

        connection.onreconnecting((error) => {
          console.log("reconnecting");
        });

        connection.onreconnected((connectionId) => {
          console.log("reconnected");
        });

        connection.onclose((error) => {
          console.log("closed");
        });
      })
      .catch(function (err) {
        console.error(err, "error occurred in hub connection start");
      });

    return () => {
      if (connection && connection.state === HubConnectionState.Connected) {
        console.log("stop connectin");
        connection.stop();
      }
    };
  }, []);

  //progress bar
  useEffect(() => {
    let timerId = setInterval(() => {
      setProgressValue((prev) => {
        if (prev === 0) return 300;
        return prev - 5;
      });
    }, 5000);

    return () => clearInterval(timerId);
  }, []);

  // console.log("monitor", hubData ?? data, hubData, data);
  return (
    <div className={styles.container}>
      <header>
        <h1>Monitor</h1>
      </header>
      <hr />
      <progress
        value={progressValue}
        max="300"
        className={styles.progressbar}
      ></progress>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className={styles.servicesContainer}>
          {(hubData ?? data).map((e) => (
            <div className={styles.service} key={e.id}>
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
