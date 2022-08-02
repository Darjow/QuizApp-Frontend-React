import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

import * as gamesApi from "../api/games";
import {addScore} from "../api/users"
import { useSession } from "./AuthProvider";

export const gamesContext = createContext();

export const useGames = () => useContext(gamesContext);


export const GamesProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [games, setGames] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const {ready: authReady} = useSession();

  const refreshGames = useCallback(async () => {
    try{
      setError();
      setLoading(true);
      const data = await gamesApi.getAllGames();
      setGames(data.data);
      return data.data;

    } catch(error){
      console.log(error);
      setError(error);
    }finally{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(authReady && !initialLoad){
      refreshGames();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshGames]);



const createGame = useCallback( async (playerID, quizID, score ) => {
  setError();
  setLoading(true);
  try{
    await gamesApi.createGame(playerID, quizID, score);
    await addScore(playerID, score)
    await refreshGames();
  }catch(error){
    console.log(error);
    throw error;
  }finally{
    setLoading(false);
  }
}, [refreshGames]);





const value = useMemo( () => ({
  games,
  error,
  loading,
  createGame,
}),
[
  games,
  error,
  loading,
  createGame,
]
);

return (
  <gamesContext.Provider value={value}>
    {children}
  </gamesContext.Provider>
);
}