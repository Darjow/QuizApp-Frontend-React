import Loader from "../components/component/Loader";
import { useSession } from "../contexts/AuthProvider";
import { useGames } from "../contexts/GamesProvider"

export default function Profile(){
  
  const {games} = useGames();
  const {user} = useSession();


  if(games.length === 0 || !user){
    return (<Loader/>)
  }else{

  const won = games.filter(e => e.score > 0 && e.player_id === user.id).length;
  const played = games.filter(e => e.player_id === user.id).length;
  const percentage_won = played !== 0?  (100 / played * won).toFixed(2): 0
  const score = user.score;


  return (
    <div>
      <div className="blue-container ">
        <h1 className="blue-component">{user.username}</h1>
      </div>
      <div className="overflow-auto">
        <table className="m-auto">
        <thead className='border-b-2 border-gray-200'>
            <tr>
              <th className="border-solid border-3 tracking-wide text-center px-10">Games played</th>
              <th className="border-solid border-3 tracking-wide text-center px-10">Games won</th>
              <th className="border-solid border-3 tracking-wide text-center px-10">Percentage won</th>
              <th className="border-solid border-3 tracking-wide text-center px-10">Score</th>
            </tr>
            </thead>
            <tbody>
            <tr className="border-solid border-3 tracking-wide text-center px-6">
              <td>{played}</td>
              <td>{won}</td>
              <td>{percentage_won}%</td>
              <td>{score}</td>
            </tr>
            </tbody>
        </table>
      </div>
      </div>  
  )
}
}