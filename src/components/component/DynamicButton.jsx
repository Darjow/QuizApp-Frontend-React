import { Link } from "react-router-dom"

export default function DynamicButton({transformed, onClick, href, className}){
  if(transformed){
    return (
      <a href={href} className={`button ${className}`}>Select another quiz</a>
    ) 
    }else{
      return (<button className={className} type="submit" onClick={onClick}>Submit</button>)
    }
  }

  //       <button className="submit-answer" type="submit" disabled={played} onClick={handleSubmitAnswer}>Submit</button>
