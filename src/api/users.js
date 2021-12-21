import {axios} from ".";

//eventueel extra: ervoor zorgen dat dit beveiligd is tegen cracken?


export const login = async(username,password) => {
  const {data} = await axios.post(`users/login`, {username,password});
  return data;
}
export const register = async(email,username,firstname,lastname,password) => {
  const {data} = await axios.post(`users/register`, {email,username,firstname,lastname,password});
  return data;
}