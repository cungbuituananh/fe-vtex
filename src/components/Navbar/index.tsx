import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/Logo.png";
import { LIST_ROUTES } from "../../routes/routes";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

function Navbar() {
  const { t } = useTranslation("menu");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav
      className="bg-white shadow px-6 mx-auto "
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className=" max-w-[1600px] flex items-center justify-between max-w-10xl mx-auto">
        <button
          className="flex items-center gap-2 focus:outline-none"
          onClick={() => {
            console.log("./");
          }}
          aria-label={t("title")}
          type="button"
        >
          <img src={logo} alt="Logo" className="w-35" />
          <span className="text-[#2F5597]">{t("title")}</span>
        </button>
        <ul className="flex gap-6 items-center text-[#4F4F4F] hidden md:flex">
          {LIST_ROUTES.map((route) => (
            <li
              key={route.name}
              className="relative py-4"
              onMouseEnter={() => setOpenDropdown(route.name)}
              onMouseLeave={() => setOpenDropdown(null)}
              onFocus={() => setOpenDropdown(route.name)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setOpenDropdown(null);
                }
              }}
              tabIndex={0} // Make the li focusable for keyboard users
            >
              {route.children ? (
                <button
                  type="button"
                  className="hover:text-blue-600 flex items-center gap-2 focus:outline-none group"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === route.name ? null : route.name
                    )
                  }
                  aria-haspopup="true"
                  aria-expanded={openDropdown === route.name}
                >
                  <span>{route.icon || null}</span>
                  <span>{t(route.name)}</span>
                  <IoMdArrowDropdown className="transition-colors group-hover:text-[#ED7D31]" />
                </button>
              ) : (
                <Link
                  to={route.url}
                  className="hover:text-blue-600 flex items-center gap-2"
                >
                  <span>{route.icon || null}</span>
                  <span>{t(route.name)}</span>
                </Link>
              )}
              {route.children && (
                <ul
                  className={`absolute left-0 mt-2 min-w-[150px] bg-white shadow-lg rounded z-10 ${
                    openDropdown === route.name ? "block" : "hidden"
                  }`}
                  style={{
                    border: "1px solid rgba(229, 229, 229, 1)",

                    borderRadius: "10px",
                  }}
                >
                  {route.children.map((child, index) => {
                    const isOnlyOne = route.children.length === 1;
                    const isLast =
                      index === route.children.length - 1 && !isOnlyOne;
                    const isFirst = index === 0 && !isOnlyOne;

                    const styleBorder = isFirst
                      ? { borderRadius: "10px 10px 0 0" }
                      : isLast
                      ? { borderRadius: "0 0 10px 10px" }
                      : isOnlyOne
                      ? { borderRadius: "10px" }
                      : {};

                    return (
                      <li key={child.name}>
                        {"url" in child ? (
                          <Link
                            to={child.url}
                            className="flex items-center gap-2 block px-4 py-2 hover:bg-[#2F5597] hover:text-[#FFF] text-gray-700"
                            tabIndex={0}
                            style={styleBorder}
                          >
                            <span>{child.icon || null}</span>
                            {t(child.name)}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={child.event}
                            className="flex items-center gap-2 block px-4 py-2 hover:bg-[#2F5597] hover:text-[#FFF] text-gray-700 w-full text-left"
                            tabIndex={0}
                            style={styleBorder}
                          >
                            <span>{child.icon || null}</span>
                            {t(child.name)}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
