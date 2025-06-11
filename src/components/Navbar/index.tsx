import { Link } from "react-router-dom";
import viteLogo from "/vite.svg";
import { LIST_ROUTES } from "../../routes/routes";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { i18n } = useTranslation();

  return (
    <nav className=" bg-white shadow px-6 py-3  mx-auto">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <img src={viteLogo} alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl">MyApp</span>
        </div>
        <ul className="flex gap-6 items-center">
          {LIST_ROUTES.map((route) => (
            <li key={route.name}>
              <Link to={route.url} className="hover:text-blue-600">
                {route.name}
              </Link>
            </li>
          ))}
          <li>
            <Button
              type="primary"
              style={{ width: 60, textAlign: "center", padding: 0 }}
              onClick={() => {
                console.log("Change language to", i18n.language);
                i18n.changeLanguage(i18n.language === "en" ? "vi" : "en");
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.dataset.prevText = btn.innerText;
                btn.innerText = i18n.language === "en" ? "VIE" : "ENG";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.innerText = btn.dataset.prevText || btn.innerText;
              }}
            >
              {i18n.language === "en" ? "ENG" : "VIE"}
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
