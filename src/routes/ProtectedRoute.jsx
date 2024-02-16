import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, isAuth, path }) => {
  const token = localStorage.getItem("_token");
  const isAuthenticated = token === null || token === undefined ? false : true;
  const isRole = isAuthenticated && isAuth ? true : false;

  if (token && isAuth !== undefined && !isAuth) {
    // register & login
    return (
      <>
        <Navigate to="/" replace={true} />
      </>
    );
  } else if ((token && isAuth) || (isAuth !== undefined && !isAuth)) {
    // other pages.
    return <>{children}</>;
  } else if (isAuth === undefined) {
    return <>{children}</>;
  } else {
    return (
      <>
        <Navigate to="/" replace={true} />
      </>
    );
  }
};
