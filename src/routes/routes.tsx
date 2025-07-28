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
import UserCompany from "@/pages/Company/RegisterComany/UserCompany";

const MapPage = lazy(() => import("../pages/Map"));
const ContactPage = lazy(() => import("../pages/Contact"));
const IntroPage = lazy(() => import("../pages/Intro"));
const UserInfo = lazy(() => import("../pages/Auth/UserInfo"));
const LoginPage = lazy(() => import("../pages/Auth"));
const HomePage = lazy(() => import("../pages/Home"));
const CompanyDetailPage = lazy(() => import("../pages/Company/CompanyDetail"));
const RegisterCompanyPage = lazy(
  () => import("../pages/Company/RegisterComany")
);
const CompanyPage = lazy(() => import("../pages/Company/index"));

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
  COMPANY_LIST: "/company/list",
  COMPANY_DETAIL: "/company/:id",
  COMPANY_DETAIL_UPDATE: "/company/:id/update",
  COMPANY_DETAIL_APPROVE: "/company/:id/approve",
  REGISTER_COMPANY: "/register-company",
  USER_COMPANY: "/user-company",
};

export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
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
    roles: [USER_ROLE.ADMIN, USER_ROLE.USER],
    children: [
      {
        name: "listCompany",
        url: ROUTE_PATH.COMPANY_LIST,
        element: <CompanyPage />,
        icon: <FaDatabase />,
        requireAuth: true,
        roles: [USER_ROLE.ADMIN],
      },
      {
        name: "registerCompany",
        url: ROUTE_PATH.REGISTER_COMPANY,
        element: <RegisterCompanyPage />,
        icon: <FaDatabase />,
        requireAuth: true,
        roles: [USER_ROLE.ADMIN, USER_ROLE.USER],
      },
      {
        name: "companyUserDetail",
        url: ROUTE_PATH.USER_COMPANY,
        element: <UserCompany />,
        icon: <FaDatabase />,
        requireAuth: true,
        roles: [USER_ROLE.USER],
      },
      {
        name: "companyDetail",
        url: ROUTE_PATH.COMPANY_DETAIL,
        element: <CompanyDetailPage />,
        hiddenInMenu: true, // Don't show in navigation menu
        requireAuth: false,
      },
      {
        name: "companyDetailUpdate",
        url: ROUTE_PATH.COMPANY_DETAIL_UPDATE,
        element: <RegisterCompanyPage isUpdate />,
        hiddenInMenu: true, // Don't show in navigation menu
        requireAuth: true,
      },
      {
        name: "companyDetailApprove",
        url: ROUTE_PATH.COMPANY_DETAIL_APPROVE,
        element: <RegisterCompanyPage isApprove />,
        hiddenInMenu: true, // Don't show in navigation menu
        requireAuth: true,
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
        element: <UserInfo />,
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
];

// Legacy LIST_ROUTES for backward compatibility (will be deprecated)
export const LIST_ROUTES = ROUTE_CONFIGS;

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
