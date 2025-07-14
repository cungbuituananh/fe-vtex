import { Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { getAllRoutes, renderRoutes } from "./routes/routes";
import Footer from "./components/Navbar/Footer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 w-full z-50 bg-white shadow">
          <Navbar />
        </header>
        <main className="flex-grow overflow-auto">
          <Routes>{renderRoutes(getAllRoutes())}</Routes>
        </main>
        <footer className="w-full bg-[#324150] mt-auto z-50">
          <Footer />
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
