import { useSession } from "../../contexts/AuthProvider";
import { useLocation, Route, Redirect } from "react-router-dom";

export default function LoginSkipWelcomeRoute ({children, ...rest}){
  const {isAuthed} = useSession();
  const {pathname} = useLocation();
  return (
    <Route {...rest}>
      {
        isAuthed? <Redirect from={pathname} to="/home"/>: (children)
      }
    </Route>
  )
}