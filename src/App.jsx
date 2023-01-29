import "./App.css";
import Logging from "./pages/logging";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import DrawerSidebar from "./components/DrawerSidebar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DrawerSidebar />}>
          <Route index element={<Logging />} />
          <Route path="/logging" element={<Logging />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
