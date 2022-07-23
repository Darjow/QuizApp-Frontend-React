import { useSession } from "../../contexts/AuthProvider"

export default function Greeting(){
  const hours = new Date().getHours();

  let greeting; 
  let css = {};

  if(hours > 12 && hours < 18){
    greeting = "Good afternoon";
    css.color = "green";
  }else if(hours > 18 || hours < 6){
    greeting = "Good evening";
    css.color = "orange";
  }else{
    greeting = "Good morning";
    css.color = "yellow";
  }

  const {user} = useSession();
  return(
    <div className="greeting-container">
      <h1 className="greeting">{greeting}, <span style={css}>{user.username}</span></h1>
      </div>
  )
}