import { lazy, type ReactNode } from "react";
import {
  FaDatabase,
  FaEnvelope,
  FaMapMarkedAlt,
  FaUser,
  FaUserFriends,
  FaSignOutAlt,
} from "react-icons/fa";
import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const MapPage = lazy(() => import("../pages/Map"));
const ContactPage = lazy(() => import("../pages/Contact"));
const IntroPage = lazy(() => import("../pages/Intro"));
const NewsPage = lazy(() => import("../pages/News"));
const LoginPage = lazy(() => import("../pages/Login"));
const HomePage = lazy(() => import("../pages/Home"));
const CompanyDetailPage = lazy(() => import("../pages/Company/CompanyDetail"));

export const PATH_ROUTES = {
  HOME: "/",
  MAP: "/map",
  CONTACT: "/contact",
  NEWS: "/news",
};

// Enhanced interface for route configuration
interface RouteConfig {
  name: string;
  url?: string;
  element?: ReactNode;
  icon?: ReactNode;
  children?: RouteConfig[];
  event?: () => void;
  // Authentication & Authorization
  requireAuth?: boolean;
  roles?: string[];
  // Menu visibility
  hiddenInMenu?: boolean;
  showOnlyWhenAuthenticated?: boolean;
  showOnlyWhenNotAuthenticated?: boolean;
}

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
  INTRO: "/intro",
  COMPANY: "/company",
  COMPANY_DETAIL: "/company/:id",
};

// Improved route configuration with clear separation of concerns
export const ROUTE_CONFIGS: RouteConfig[] = [
  {
    name: "home",
    url: ROUTE_PATH.HOME,
    element: <HomePage />,
    hiddenInMenu: true, // Don't show in navigation menu
    requireAuth: false,
  },
  {
    name: "map",
    url: ROUTE_PATH.MAP,
    element: <MapPage />,
    icon: <FaMapMarkedAlt />,
    requireAuth: false,
  },
  {
    name: "intro",
    icon: <FaUserFriends />,
    requireAuth: false,
    children: [
      {
        name: "intro",
        url: ROUTE_PATH.INTRO,
        element: <IntroPage />,
        icon: <FaUserFriends />,
        requireAuth: false,
      },
    ],
  },
  {
    name: "data",
    icon: <FaDatabase />,
    requireAuth: true,
    roles: ["admin", "user"],
    children: [
      {
        name: "news",
        url: ROUTE_PATH.NEWS,
        element: <NewsPage />,
        icon: <FaDatabase />,
        requireAuth: true,
        roles: ["admin", "user"],
      },
    ],
  },
  {
    name: "contact",
    url: ROUTE_PATH.CONTACT,
    icon: <FaEnvelope />,
    element: <ContactPage />,
    requireAuth: false,
  },
  {
    name: "account",
    icon: <FaUser />,
    children: [
      {
        name: "login",
        url: ROUTE_PATH.LOGIN,
        element: <LoginPage />,
        icon: <FaUser />,
        showOnlyWhenNotAuthenticated: true, // Only show when not logged in
        requireAuth: false,
      },
      {
        name: "register",
        url: ROUTE_PATH.REGISTER,
        element: <LoginPage />,
        icon: <FaUser />,
        showOnlyWhenNotAuthenticated: true, // Only show when not logged in
        requireAuth: false,
      },
      {
        name: "userInfo",
        url: ROUTE_PATH.USER_INFO,
        element: <NewsPage />,
        icon: <FaUser />,
        showOnlyWhenAuthenticated: true, // Only show when logged in
        requireAuth: true,
      },
      {
        name: "logout",
        icon: <FaSignOutAlt />,
        showOnlyWhenAuthenticated: true, // Only show when logged in
      },
    ],
  },
  {
    name: "company",
    url: ROUTE_PATH.COMPANY_DETAIL,
    element: <CompanyDetailPage />,
    hiddenInMenu: true, // Don't show in navigation menu
    requireAuth: false,
  },
];

// Legacy LIST_ROUTES for backward compatibility (will be deprecated)
export const LIST_ROUTES = ROUTE_CONFIGS;

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

// Utility function to filter routes based on authentication state and roles
export function getVisibleRoutes(
  routes: RouteConfig[],
  isAuthenticated: boolean,
  userRoles: string[] = []
): RouteConfig[] {
  return routes
    .filter((route) => {
      // Filter based on authentication requirements
      if (route.showOnlyWhenAuthenticated && !isAuthenticated) return false;
      if (route.showOnlyWhenNotAuthenticated && isAuthenticated) return false;
      if (route.hiddenInMenu) return false;

      // Filter based on roles if specified
      if (route.roles && route.roles.length > 0) {
        if (!isAuthenticated) return false;
        if (!route.roles.some((role) => userRoles.includes(role))) return false;
      }

      return true;
    })
    .map((route) => ({
      ...route,
      children: route.children
        ? getVisibleRoutes(route.children, isAuthenticated, userRoles)
        : undefined,
    }));
}

// Enhanced function to render routes with protection
export function renderRoutes(routes: RouteConfig[]): ReactNode[] {
  return routes.flatMap((route) => {
    const elements: ReactNode[] = [];

    if (route.url && route.element) {
      // Wrap element with ProtectedRoute if authentication is required
      const protectedElement = route.requireAuth ? (
        <ProtectedRoute roles={route.roles} requireAuth={route.requireAuth}>
          {route.element}
        </ProtectedRoute>
      ) : (
        route.element
      );

      elements.push(
        <Route key={route.url} path={route.url} element={protectedElement} />
      );
    }

    if (route.children) {
      elements.push(...renderRoutes(route.children));
    }

    return elements;
  });
}

// Helper function to get routes that should be rendered (all routes)
export function getAllRoutes(): RouteConfig[] {
  return ROUTE_CONFIGS;
}

export type { RouteConfig };
