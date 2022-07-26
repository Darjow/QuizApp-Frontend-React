import { useMemo } from "react";
import { Redirect, Route, useLocation } from "react-router";
import { useSession } from "../../contexts/AuthProvider";

export default function PrivateRoute({children, toIf, path, method,loggedIn, role, ...rest }){
  const {isAuthed, hasRole} = useSession();
  const {pathname} = useLocation();


  const isAllowed = useMemo(() => {
    if(!role) return ((loggedIn && isAuthed) || (!loggedIn && !isAuthed))?  true : false;
    return isAuthed && hasRole(role)
  }, [isAuthed, loggedIn,role, hasRole])
  

  return (
    <Route>
      {isAllowed? (children): <Redirect from={pathname} to={toIf}/>}
    </Route>
  )
}

