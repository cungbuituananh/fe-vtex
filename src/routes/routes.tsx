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

export const ROUTE_PATH = {
  HOME: "/",
  MAP: "/map",
  CONTACT: "/contact",
  NEWS: "/news",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  USER_INFO: "/user-info",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
};

export const LIST_ROUTES = [
  {
    name: "map",
    url: ROUTE_PATH.MAP,
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
        url: ROUTE_PATH.CONTACT,
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
        url: ROUTE_PATH.NEWS,
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
    name: "news",
    url: ROUTE_PATH.NEWS,
    icon: <FaEnvelope />,
  },
  {
    name: "account",
    icon: <FaUser />,
    children: [
      {
        name: "login",
        url: ROUTE_PATH.LOGIN,
        element: <LoginPage />,
        icon: <FaDatabase />,
      },
      {
        name: "userInfo",
        url: ROUTE_PATH.USER_INFO,
        element: <NewsPage />,
        icon: <FaDatabase />,
      },
      {
        name: "register",
        url: ROUTE_PATH.REGISTER,
        element: <LoginPage />,
        icon: <FaDatabase />,
        invisible: true, // This route is not visible in the menu
      },
    ],
  },
];

export const ROUTES_WITHOUT_LAYOUT = {
  LOGIN: ROUTE_PATH.LOGIN,
  REGISTER: ROUTE_PATH.REGISTER,
  FORGOT_PASSWORD: ROUTE_PATH.FORGOT_PASSWORD,
  RESET_PASSWORD: ROUTE_PATH.RESET_PASSWORD,
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
