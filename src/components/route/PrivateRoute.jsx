import { Redirect, Route } from "react-router";


export const PrivateRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? <Comp {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};