import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { LIST_ROUTES } from "./routes/routes";

function App() {
  console.log("LIST_ROUTES: ", LIST_ROUTES);
  return (
    <>
      <Navbar />
      <Routes>
        {LIST_ROUTES.map((route) => (
          <Route key={route.name} path={route.url} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
