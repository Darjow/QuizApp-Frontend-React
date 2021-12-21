import { NavLink } from "react-router-dom"


const NavItem = ({to, label}) => (
  <span>
    <NavLink
      to={to}
      className="hover:text-blue-500"
      activeClassName="text-green-500 cursor-default">
        {label}
      </NavLink>
  </span>
)


export default function NavMenu(){
  return (
    <div className="navMenuContainer mb-6">
      <nav className="flex space-x-6">
        <NavItem to="/profile" label="Your profile" />
        <NavItem to="/play" label="Start a quiz"/>
      </nav>
    </div>
  )
}