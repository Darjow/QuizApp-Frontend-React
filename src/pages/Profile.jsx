import Loader from "../components/component/Loader";
import Statistics from "../components/component/PlayerStatistics";
import { useSession } from "../contexts/AuthProvider";
import { useGames } from "../contexts/GamesProvider"
export default function Profile(){
  
  const {games} = useGames();
  const {user} = useSession();


  if(games.length === 0 || !user){
    return (<Loader/>)
  }else{
    return (<Statistics games={games} user={user}/>)
  }
}