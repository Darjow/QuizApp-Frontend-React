import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
  background-color: var(--main-color);  
  display: flex;
  flex-direction: column;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index:10;

  @media (min-width: 767px) {
    height: 80px;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  font-size: large;

  :hover{
    color: var(--active-color);
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  text-decoration: none;
  margin: 10px;

  :hover{
    color: var(--active-color);
  }
`;


export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;
  position: absolute;
  right: 0px;

  @media (min-width: 767px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 767px) {
    display: none;
  }
`;