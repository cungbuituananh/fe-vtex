import { Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { LIST_ROUTES, renderRoutes } from "./routes/routes";
import Footer from "./components/Navbar/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>{renderRoutes(LIST_ROUTES)}</Routes>
      <Footer />
    </>
  );
}

export default App;
