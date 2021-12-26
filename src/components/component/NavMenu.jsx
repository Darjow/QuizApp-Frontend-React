import { NavLink } from "react-router-dom"
import {useCallback} from "react";
import {useLogout, useSession} from "../../contexts/AuthProvider"

const NavItem = ({to, label, method, className}) => (
  <span>
    <NavLink
      to={to}
      className={className?className:"hover:text-blue-500"}
      activeClassName="text-green-500 cursor-default"
      onClick={method? method:null}
      >
        {label}
      </NavLink>
  </span>
)


export default function NavMenu(){
  const {isAuthed, user, hasRole } = useSession();
  const logOut = useLogout();
  const handleLogout = useCallback(() => {
    logOut();
  }, [logOut]);

  const adminExtraNav = () => {
    if(user){   
      if(hasRole("admin")){
        return true;
      }
    }
      return false;
    }
  
  return (
    <div className="navMenuContainer mb-6">
        {(isAuthed)? (
          <nav className="flex space-x-6">
            <NavItem to={user? user.user? `/profile/${user.user.ID}`: `/profile${user.ID}`: "/profile"} label="Profile" />
            <NavItem to="/play" label="Play"/>
            {adminExtraNav()? ( <NavItem to="quizes/approve" label="Approve Quizes"/>): <>  </>}
            <NavItem to="/logout" label="Log out" method={handleLogout} className={"text-green-500"}/>
          </nav>
        ) : 
        (         
          <nav className="flex space-x-6">
            <NavItem to="/login" label="Sign in" />
            <NavItem to="/register" label="Register"/> 
          </nav>
        )
              }  
      
    </div>
  )
            }
          