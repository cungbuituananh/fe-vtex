import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import { LIST_ROUTES } from "../../routes/routes";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { PRIMARY_COLOR } from "@/constants/color";
import { Button } from "antd";
import { US, VN } from "country-flag-icons/react/1x1";

function Navbar() {
  const { t, i18n } = useTranslation("menu");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const location = useLocation();

  // Get current language
  const currentLanguage = i18n.language;
  console.log("currentLanguage: ", currentLanguage);

  // Helper to check if route is active
  const isActive = (url: string) => {
    // Exact match or startsWith for parent routes
    return location.pathname === url;
  };

  return (
    <nav
      className="shadow px-6 mx-auto "
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex px-5 items-center justify-between max-w-10xl mx-auto">
        <Link to="/" className="flex items-center gap-2 focus:outline-none">
          <img src={logo} alt="Logo" className="w-35" />
          <span className="text-[#2F5597]">{t("title")}</span>
        </Link>
        <ul className="flex gap-6 items-center text-[#4F4F4F] hidden md:flex">
          {LIST_ROUTES.filter((item) => !item.invisible).map((route) => {
            // Determine if the route is active
            const isActiveRoute = isActive(route.url || "");
            const isChildActive = route.children?.some((child: any) =>
              isActive(child.url || "")
            );

            return (
              <li
                key={route.name}
                className={`relative py-4  text-[14px] 
                 ${
                   isActiveRoute || isChildActive
                     ? `text-[${PRIMARY_COLOR}]`
                     : "text-[#4F4F4F]"
                 }
                `}
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
                    className="hover:text-blue-600  flex items-center gap-2 focus:outline-none group"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === route.name ? null : route.name
                      )
                    }
                    aria-haspopup="true"
                    aria-expanded={openDropdown === route.name}
                  >
                    <span className="text-[16px]">{route.icon || null}</span>
                    <span>{t(route.name)}</span>
                    <IoMdArrowDropdown
                      className={`transition-colors group-hover:text-[#ED7D31] ${
                        isActiveRoute || isChildActive ? "text-[#ED7D31]" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={route.url}
                    className="hover:text-blue-600 flex items-center gap-2"
                  >
                    <span className="text-[16px]">{route.icon || null}</span>
                    <span>{t(route.name)}</span>
                  </Link>
                )}
                {route.children && (
                  <ul
                    className={`absolute left-0 mt-2 min-w-[120px] text-nowrap bg-white shadow-lg rounded z-10 ${
                      openDropdown === route.name ? "block" : "hidden"
                    }`}
                    style={{
                      border: "1px solid rgba(229, 229, 229, 1)",

                      borderRadius: "10px",
                    }}
                  >
                    {route.children
                      .filter((item: any) => !item.invisible)
                      .map((child: any, index) => {
                        const countLength = route.children.filter(
                          (item: any) => !item.invisible
                        ).length;
                        const isOnlyOne = countLength === 1;

                        const isLast = index === countLength - 1 && !isOnlyOne;
                        const isFirst = index === 0 && !isOnlyOne;

                        const styleBorder = isFirst
                          ? { borderRadius: "10px 10px 0 0" }
                          : isLast
                          ? { borderRadius: "0 0 10px 10px" }
                          : isOnlyOne
                          ? { borderRadius: "10px" }
                          : {};

                        const isActiveChild = isActive(child.url || "");

                        return (
                          <li key={child.name} className="text-[14px]">
                            {"url" in child ? (
                              <Link
                                to={child.url}
                                className={`flex items-center gap-2 block px-2 py-2 hover:bg-[#2F5597] hover:text-[#FFF] ${
                                  isActiveChild
                                    ? "bg-[#2F5597] text-[#FFF]"
                                    : "text-[#4F4F4F]"
                                } w-full text-left`}
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
                                className={`flex items-center gap-2 block px-4 py-2 hover:bg-[#2F5597] hover:text-[#FFF] text-gray-700 w-full text-left`}
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
            );
          })}
          <li>
            <Button
              color="default"
              variant="outlined"
              onClick={() =>
                i18n.changeLanguage(currentLanguage === "en" ? "vi" : "en")
              }
              className="max-w-[80px]"
            >
              <span>
                {currentLanguage === "en" ? (
                  <US title="Vietnamese" style={{ width: 16, height: 16 }} />
                ) : (
                  <VN title="English" style={{ width: 16, height: 16 }} />
                )}
              </span>
              {currentLanguage === "en" ? "ENG" : "VIE"}
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
