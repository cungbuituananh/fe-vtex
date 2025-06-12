import { lazy, type ReactNode } from "react";
import {
  FaDatabase,
  FaEnvelope,
  FaFlag,
  FaMapMarkedAlt,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import US from "country-flag-icons/react/3x2/US";
import VN from "country-flag-icons/react/3x2/VN";
import i18n from "../i18n";
import { Route } from "react-router-dom";

const MapPage = lazy(() => import("../pages/Map"));
const ContactPage = lazy(() => import("../pages/Contact"));
const IntroPage = lazy(() => import("../pages/Intro"));
const NewsPage = lazy(() => import("../pages/News"));
const LoginPage = lazy(() => import("../pages/Login"));

export const PATH_ROUTES = {
  HOME: "/",
  MAP: "/map",
  CONTACT: "/contact",
  NEWS: "/news",
};

// interface RouteConfig {
//   name: string;
//   url?: string;
//   element?: ReactNode;
//   icon?: ReactNode;
//   children?: RouteConfig[];
//   event?: () => void;
// }

export const LIST_ROUTES = [
  {
    name: "map",
    url: "/map",
    element: <MapPage />,
    icon: <FaMapMarkedAlt />,
  },
  {
    name: "contact",
    element: <ContactPage />,
    icon: <FaUserFriends />,
    children: [
      {
        name: "contact",
        url: "/contact",
        element: <ContactPage />,
        icon: <FaUserFriends />,
      },
    ],
  },
  {
    name: "data",
    element: <NewsPage />,
    icon: <FaDatabase />,
    children: [
      {
        name: "news",
        url: "/news",
        element: <NewsPage />,
        icon: <FaDatabase />,
      },
    ],
  },
  {
    name: "language",
    icon: <FaFlag />,
    children: [
      {
        name: "english",
        icon: <US title="English" style={{ width: 24, height: 16 }} />,
        event: () => {
          i18n.changeLanguage("en");
        },
      },
      {
        name: "vietnamese",
        icon: <VN title="Vietnamese" style={{ width: 24, height: 16 }} />,
        event: () => {
          i18n.changeLanguage("vi");
        },
      },
    ],
  },
  {
    name: "contact",
    url: "/news",
    icon: <FaEnvelope />,
  },
  {
    name: "account",
    icon: <FaUser />,
    children: [
      {
        name: "login",
        url: "/login",
        element: <LoginPage />,
        icon: <FaDatabase />,
      },
      {
        name: "userInfo",
        url: "/user-info",
        element: <NewsPage />,
        icon: <FaDatabase />,
      },
    ],
  },
];

export const ROUTES_WITHOUT_LAYOUT = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
};

export const ROUTES_WITH_LAYOUT = {
  HOME: "/",
  MAP: "/map",
  CONTACT: "/contact",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
};

export function renderRoutes(routes: any[]): ReactNode[] {
  return routes.flatMap((route) => {
    const elements: ReactNode[] = [];
    if (route.url && route.element) {
      elements.push(
        <Route key={route.url} path={route.url} element={route.element} />
      );
    }
    if (route.children) {
      elements.push(...renderRoutes(route.children));
    }
    return elements;
  });
}
