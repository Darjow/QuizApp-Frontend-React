import {useCallback} from "react";
import {useLogout, useSession} from "../../contexts/AuthProvider"
import { useState } from "react";
import { Nav } from "react-bootstrap";
import {
  NavbarContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  OpenLinksButton,
  NavbarLinkExtended,
} from "./NavBarElements"
import { NavLink } from "react-router-dom";


export default function NavMenu() {

  const [extendNavbar, setExtendNavbar] = useState(false);
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
    (isAuthed? (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
      <NavLink to="/" className="header-quiz-master title" style={{marginLeft:'1rem'}}>Quiz-Master</NavLink>
          <NavbarLinkContainer>
            <NavbarLink to="/play"> Play</NavbarLink>
            <NavbarLink to="/create">Create a quiz</NavbarLink>
            <NavbarLink to={user? user.user? `/profile/${user.user.id}`: `/profile/${user.id}`: "/profile"}>Profile</NavbarLink>
            {adminExtraNav()? ( <NavbarLink to="quizes/approve">Approve quizes</NavbarLink>): <>  </>}
            <NavbarLink to="/login" onClick={handleLogout}>Logout</NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
      </NavbarInnerContainer>
      {extendNavbar && (

        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/play">Play</NavbarLinkExtended>
          <NavbarLinkExtended to="/create">Create a quiz</NavbarLinkExtended>
          <NavbarLinkExtended to={user? user.user? `/profile/${user.user.id}`: `/profile/${user.id}`: "/profile"}>Profile</NavbarLinkExtended>
          {adminExtraNav()? <NavbarLinkExtended to="/quizes/approve">Approve quizes</NavbarLinkExtended> : <></>}
          <NavbarLinkExtended to="/login" onClick={handleLogout} >Logout</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
    ) : (
      <Nav>
            <NavLink to="/login" label="Sign in" />
            <NavLink to="/register" label="Register"/>  
      </Nav>
    )
    )
  )
}
