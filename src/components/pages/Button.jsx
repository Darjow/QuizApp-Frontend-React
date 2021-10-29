import { Link } from "react-router-dom";



export const Button = ({
className, buttonStyle,  buttonSize, linkTo, onClick, text
}) => {
  return(
    <Link to={linkTo} className="btn-mobile">
      <button 
        className={`${className} ${buttonStyle} ${buttonSize}`}
        onClick={onClick}
      >
        {text}
      </button>
    </Link>
  )
}
