import { Redirect, useLocation } from "react-router";
import { useSession } from "../../contexts/AuthProvider";

export default function RedirectRoute(){
  const {isAuthed} = useSession();
  const {pathname} = useLocation();

    return <Redirect from={pathname} to={isAuthed? "/home" : "/login"}/>
}