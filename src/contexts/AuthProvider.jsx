import { useEffect } from "react";
import { useState, createContext, useCallback,useMemo} from "react";
import * as userApi from "../api/users";
import config from "../config.json";
import { setAuthToken }  from "../api/";
import { useContext } from "react";



const TOKEN = config.token_key;
const AuthContext = createContext();


function parseJwt(token){
  if(!token) return {};
  const base64url = token.split(".")[1];
  const payload = Buffer.from(base64url,"base64");
  const jsonPayload = payload.toString("ascii");
  return JSON.parse(jsonPayload);
}

function parseExp(exp){
  if(!exp) return null;
  if(typeof exp !== "number") exp = Number(exp);
  if(isNaN(exp)) return null;
  return new Date(exp * 1000);
}


const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const {loading, error, token, user, ready, hasRole} = useAuth();
  return {loading,error,token,user,ready, isAuthed: Boolean(token), hasRole};
}
export const useLogin = () => {
  const {login} = useAuth();
  return login;
}

export const useLogout = () => {
  const {logOut} = useAuth();
  return logOut;
}
export const useRegister = () => {
  const {register} = useAuth();
  return register;
}

export const AuthProvider = ({children}) =>{
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem(TOKEN));
  const [user, setUser] = useState(null);

  const setSession = useCallback(async (token, user) => {
    const {exp,id} = parseJwt(token);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if(stillValid){
      localStorage.setItem(TOKEN,token)
    }
    else{
      localStorage.removeItem(TOKEN);
      token = null;
    }
    setAuthToken(token);
    setReady(stillValid);
    setToken(token);

    if (!user && stillValid){
      user = await userApi.getById(id);
    }
    setUser(user);
  },[]);

  useEffect(() => {
    setSession(token, null);
  }, [token, setSession]);

  const login = useCallback(async (email,password) => {
    try{
      setLoading(true);
      setError("");
      const {token, user} = await userApi.login(email,password);
      setSession(token,user);
      return true;
    } catch(error){
        setError(error.response);
        return false;
    }finally{
      setLoading(false);
    }
  },[setSession])


  const register = useCallback(async ({email,username, password, firstname, lastname}) => {
    try{
      setLoading(true);
      setError("");
      const {token, user} = await userApi.register({email,username, password, firstname, lastname});
      setSession(token,user)
      return true;
    } catch(error){
        setError(error.response);
        return false;
    }finally{
      setLoading(false);
    }
  },[setSession])

  const logOut = useCallback(() => {
   setSession(null,null);
  }, [setSession]);


  const hasRole = useCallback((role) => {
    if (!user) return false;
    if(user.user){
      return user.user.roles.includes(role);
    }else{
      return user.roles.includes(role);
    }
  }, [user])

  const value = useMemo(() =>  ({
    loading,
    error,
    token,
    user,
    login,
    logOut,
    ready,
    register,
    hasRole
    
  }),[loading,error,token,user, login,logOut,ready, register, hasRole]);


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}