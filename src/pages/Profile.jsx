import Statistics from "../components/component/PlayerStatistics";
import { useSession } from "../contexts/AuthProvider";
import { useGames } from "../contexts/GamesProvider"

export default function Profile(){
  
  const {games} = useGames();
  const {user} = useSession();

    return (<Statistics games={games} user={user}/>)
  }
