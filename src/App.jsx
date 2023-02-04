import { RouterProvider } from "react-router-dom";
import "./App.css";

import { myrouter } from "./router";

function App() {
  return (
    <>
      <RouterProvider router={myrouter} />
    </>
  );
}

export default App;
