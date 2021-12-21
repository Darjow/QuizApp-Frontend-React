import { useEffect } from "react";
import { useState, createContext, useCallback,useMemo} from "react";
import * as userApi from "../api/users";
import config from "../config.json";
import { setAuthToken }  from "../api/";
import { useContext } from "react";



const TOKEN = config.token_key;
const AuthContext = createContext();


const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const {loading, error, token, user, ready} = useAuth();
  return {loading,error,token,user,ready, isAuthed: Boolean(token)};
}
export const useLogin = () => {
  const {login} = useAuth();
  return login;
}

export const useLogout = () => {
  const {logout} = useAuth();
  return logout;
}

export const AuthProvider = ({children}) =>{
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem(TOKEN));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(token){
      localStorage.setItem(TOKEN,token)
    }
    else{
      localStorage.removeItem(TOKEN);
    }
    setAuthToken(token);
    setReady(Boolean(token));
  }, [token]);

  const login = useCallback(async (email,password) => {
    try{
      setLoading(true);
      setError("");
      const {token, user} = await userApi.login(email,password);
      setToken(token);
      setUser(user);
      return true;
    } catch(error){
      console.error(error);
      setError("Login failed, try again");
      return false;
    }finally{
      setLoading(false);
    }
  },[])

  const logOut = useCallback(() => {
    setToken(null);
    setUser(null);

  }, []);



  const value = useMemo(() =>  ({
    loading,
    error,
    token,
    user,
    login,
    logOut,
    ready,
    
  }),[loading,error,token,user, login,ready,logOut]);


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}