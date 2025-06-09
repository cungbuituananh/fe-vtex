import { Link } from "react-router-dom";
import viteLogo from "/vite.svg";

function Navbar() {
  return (
    <nav className=" bg-white shadow px-6 py-3  mx-auto">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <img src={viteLogo} alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl">MyApp</span>
        </div>
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
