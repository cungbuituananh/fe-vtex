import { Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { getAllRoutes, renderRoutes } from "./routes/routes";
import Footer from "./components/Navbar/Footer";
import { AuthProvider } from "./contexts/AuthContext";

const PATH_HIDDEN_FOOTER = ["/login", "/register", "/forgot-password"];

function App() {
  const location = useLocation();
  const isHiddenFooter = PATH_HIDDEN_FOOTER.includes(location.pathname);

  console.log("location: ", location);

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 w-full z-50 bg-white shadow">
          <Navbar />
        </header>
        <main className="flex-1 flex flex-col overflow-hidden">
          <Routes>{renderRoutes(getAllRoutes())}</Routes>
        </main>

        {!isHiddenFooter && (
          <footer className="w-full bg-[#324150] mt-auto z-50">
            <Footer />
          </footer>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
