import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROUTE_PATH } from "../routes/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles = [],
  requireAuth = true,
}) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login page with return url
    return (
      <Navigate to={ROUTE_PATH.LOGIN} state={{ from: location }} replace />
    );
  }

  // If user is authenticated but doesn't have required roles
  if (isAuthenticated && roles.length > 0 && !hasRole(roles)) {
    // You can redirect to an unauthorized page or home page
    return <Navigate to={ROUTE_PATH.HOME} replace />;
  }

  // If user is authenticated and trying to access login/register pages
  if (
    isAuthenticated &&
    (location.pathname === ROUTE_PATH.LOGIN ||
      location.pathname === ROUTE_PATH.REGISTER)
  ) {
    // Redirect to the page they were trying to access or home
    const from = location.state?.from?.pathname || ROUTE_PATH.HOME;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
