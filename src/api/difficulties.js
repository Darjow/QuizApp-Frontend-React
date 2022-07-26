import {axios} from ".";

export const getAllDifficulties = async () => {
  const { data } = await axios.get(`difficulties`)
  return data;
}
