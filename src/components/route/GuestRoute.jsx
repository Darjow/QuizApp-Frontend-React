import { Redirect, Route, useLocation } from "react-router";
import { useSession } from "../../contexts/AuthProvider";

export default function GuestRoute({children, ...rest}){
  const {isAuthed} = useSession();
  const {pathname} = useLocation();
  
  return (
    <Route {...rest}>
      {!isAuthed? (children): <Redirect from={pathname} to="/login"/>}
    </Route>
  )
}