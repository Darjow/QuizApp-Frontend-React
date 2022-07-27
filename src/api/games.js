import {axios} from ".";

export const createGame = async (playerID, quizID, score) => {
  return await axios.post(`/games`, {playerID, quizID, score})
}

export const getAllGames = async () => {
 return await axios.get("/games")
}