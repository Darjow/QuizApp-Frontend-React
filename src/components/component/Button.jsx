import { Link } from "react-router-dom";
import {useLocation} from "react-router"

export const Button = ({
className, buttonStyle, linkTo, onClick, text, type
}) => {
 
  const location = useLocation();
  

  return(
    <Link to={linkTo == null ? location.pathname : linkTo}>
      <button 
        className={`btn-mobile ${className} ${buttonStyle}`}
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    </Link>
  )
}
