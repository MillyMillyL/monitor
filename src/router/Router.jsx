import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Layout } from "../layout";
import { LoggingPage, MonitorPage, NotFoundPage } from "../pages";

const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <MonitorPage /> },
      { path: "monitor", element: <MonitorPage /> },
      { path: "logging", element: <LoggingPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default Router;
