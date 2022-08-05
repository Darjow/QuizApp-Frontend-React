import { useMemo } from "react";
import { Redirect, Route, useLocation } from "react-router";
import { useSession } from "../../contexts/AuthProvider";
import Loader from "../component/Loader";


export default function PrivateRoute({children, role, toIf, ...rest}){
  const {isAuthed, hasRole, user} = useSession();
  const {pathname} = useLocation();

  const isAllowed = useMemo(() => {
    if(!role) return (isAuthed);
    return isAuthed && hasRole(role);
  }, [isAuthed,role, hasRole])

  if(localStorage.getItem("auth_token") !== null && !user){
    return <Loader/>
  }

    return (
      <Route {...rest}>
        {isAllowed? (children): <Redirect from={pathname} to={!isAuthed? "/login" : toIf? toIf:"/login"}/>}
      </Route>
    )
  }



