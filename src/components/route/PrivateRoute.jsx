import { Route } from "react-router";
import Login from "../../pages/Login";

export const PrivateRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? <Comp {...props} /> : <Login to="/login" />;
      }}
    />
  );
};