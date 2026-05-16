import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('usuario')
  const token = localStorage.getItem('token')

  if (!user && !token) {
    return <Navigate to="/" replace />;
    console.log("voltou")
  }

  return children;
};

export default PrivateRoute;