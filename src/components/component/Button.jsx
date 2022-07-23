import {useLocation} from "react-router"

export const Button = ({
className, linkTo, onClick, text
}) => {
 
  const location = useLocation();
  
  return(
      <a href={linkTo == null? location.pathname : linkTo} className={`button ${className}`} onClick={onClick}> {text} </a>
  )
}
