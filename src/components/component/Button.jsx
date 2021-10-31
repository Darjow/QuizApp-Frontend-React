import { Link } from "react-router-dom";



export const Button = ({
className, buttonStyle, linkTo, onClick, text, type
}) => {
 

  return(
    <Link to={linkTo == null ? "" : linkTo}>
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
