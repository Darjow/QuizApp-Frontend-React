import {axios} from ".";




export const login = async(username,password) => {
  const {data} = await axios.post(`users/login`, {username,password});
  return data;
}
export const register = async({email,username,firstname,lastname,password}) => {
  const {data} = await axios.post(`users/register`, {email,username,firstname,lastname,password});
  return data;
}
export const getById = async (id) => {
  const {data} = await axios.get(`users/${id}`);
  return data;
}

export const addScore = async (id, score) => {
  const {data} = await axios.post(`users/${id}/score`, {score})
  return data;
}
