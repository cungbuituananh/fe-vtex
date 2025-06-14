import { Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { LIST_ROUTES, renderRoutes } from "./routes/routes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>{renderRoutes(LIST_ROUTES)}</Routes>
    </>
  );
}

export default App;
