import { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getVisibleRoutes,
  ROUTE_CONFIGS,
  type RouteConfig,
} from "../routes/routes";

export const useRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  const visibleRoutes = useMemo(() => {
    return getVisibleRoutes(
      ROUTE_CONFIGS,
      isAuthenticated,
      user ? [user.role] : []
    );
  }, [isAuthenticated, user]);

  const allRoutes = useMemo(() => ROUTE_CONFIGS, []);

  const findRouteByPath = (path: string): RouteConfig | null => {
    const findInRoutes = (routes: RouteConfig[]): RouteConfig | null => {
      for (const route of routes) {
        if (route.url === path) {
          return route;
        }
        if (route.children) {
          const found = findInRoutes(route.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findInRoutes(allRoutes);
  };

  const isAuthorizedForRoute = (path: string): boolean => {
    const route = findRouteByPath(path);
    if (!route) return true; // Allow access to non-configured routes

    // Check authentication requirement
    if (route.requireAuth && !isAuthenticated) {
      return false;
    }

    // Check role requirement
    if (route.roles && route.roles.length > 0) {
      if (!isAuthenticated || !user) return false;
      return route.roles.includes(user.role);
    }

    return true;
  };

  return {
    visibleRoutes,
    allRoutes,
    findRouteByPath,
    isAuthorizedForRoute,
  };
};

export default useRoutes;
