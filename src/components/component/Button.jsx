import {useLocation} from "react-router"

export const Button = ({
className, linkTo, onClick, text, ...rest
}) => {
 
  const location = useLocation();
  
  return(
      <a href={linkTo == null? location.pathname : linkTo} className={`button ${className}`} onClick={onClick} {...rest}> {text} </a>
  )
}
