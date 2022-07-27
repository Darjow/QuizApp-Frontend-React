import { useSession } from "../../contexts/AuthProvider"

export default function Greeting(){
  const hours = new Date().getHours();

  let greeting; 
  let css = {};
  let css1 = {};


  if(hours >= 12 && hours < 18){
    greeting = "Good afternoon";
    css.color = "green";
    css1.color = "darkblue"
  }else if(hours >= 18 || hours < 6){
    greeting = "Good evening";
    css.color = "orange";
    css1.color = "red";
  }else{
    greeting = "Good morning";
    css.color = "yellow";
    css1.color = "orange"
  }

  const {user} = useSession();
  return(
    <div className="greeting-container">
      <h1 className="greeting" style={css1}>{greeting}, <span style={css}>{user.username}</span></h1>
      </div>
  )
}