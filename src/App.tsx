import { Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { LIST_ROUTES, renderRoutes } from "./routes/routes";
import Footer from "./components/Navbar/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 w-full z-50 bg-white shadow">
        <Navbar />
      </header>
      <Routes>{renderRoutes(LIST_ROUTES)}</Routes>
      <footer className="w-full bg-[#324150]">
        <Footer />
      </footer>
    </div>
    // <>
    //   <Navbar />
    //   <Routes>{renderRoutes(LIST_ROUTES)}</Routes>
    //   <Footer />
    // </>
  );
}

export default App;
