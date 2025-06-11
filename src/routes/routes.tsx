import { lazy } from "react";

const HomePage = lazy(() => import("../pages/Home"));
const MapPage = lazy(() => import("../pages/Map"));
const ContactPage = lazy(() => import("../pages/Contact"));
const NewsPage = lazy(() => import("../pages/News"));

export const PATH_ROUTES = {
  HOME: "/",
  MAP: "/map",
  CONTACT: "/contact",
  NEWS: "/news",
};

export const LIST_ROUTES = [
  {
    name: "Home",
    url: PATH_ROUTES.HOME,
    element: <HomePage />,
  },
  {
    name: "Map",
    url: "/map",
    element: <MapPage />,
  },
  {
    name: "Contact",
    url: "/contact",
    element: <ContactPage />,
  },
  {
    name: "News",
    url: "/news",
    element: <NewsPage />,
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
