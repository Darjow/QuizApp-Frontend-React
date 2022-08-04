import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

import * as quizApi from "../api/quiz";
import { useSession } from "./AuthProvider";

export const quizContext = createContext();

export const useQuizes = () => useContext(quizContext);


export const QuizesProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [notApprovedQuizes, setNotApprovedQuizes] = useState([]);

  const {hasRole} = useSession();


  const {ready: authReady} = useSession();

  

  const refreshQuizes = useCallback(async () => {
    try{
      setError();
      setLoading(true);
      const data = await quizApi.getAllQuiz();
      if(hasRole("admin")){
        const data2 = await quizApi.getNotApprovedQuizes();
        setNotApprovedQuizes(data2.data);
      }
      setQuizes(data.data);
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
      refreshQuizes();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshQuizes]);




const deleteQuiz = useCallback( async (id) => {
  try{
    setError();
    setLoading(true);
    await quizApi.deleteQuiz(id);
    refreshQuizes();
  }catch(error){
    console.log(error);
    throw error;
  }finally{
    setLoading(false);
  }
  }, [refreshQuizes]
);

const approveQuiz = useCallback( async (id) => {

  try{
    setError();
    setLoading(true)
    const updated = await quizApi.approveQuiz(id);
    refreshQuizes();
    return updated;
  } catch(error){
    console.log(error);
    throw error;
    } finally{
      setLoading(false);
    }

}, [refreshQuizes])


const createQuiz = useCallback( async ({...quiz}  ) => {
  try{
      setError();
      setLoading(true)
      const newQuiz = await quizApi.create(quiz);
      refreshQuizes();
      return true;
  } catch(error){
    console.log(error);
    throw error;
    } finally{
      setLoading(false);
    }
},[refreshQuizes])

const value = useMemo( () => ({
  quizes,
  error,
  loading,
  currentQuiz,
  deleteQuiz,
  setCurrentQuiz,
  notApprovedQuizes,
  approveQuiz,
  createQuiz

}),
[
  quizes,
  error,
  loading,
  currentQuiz,
  deleteQuiz,
  setCurrentQuiz,
  notApprovedQuizes,
  approveQuiz,
  createQuiz
]
);

return (
  <quizContext.Provider value={value}>
    {children}
  </quizContext.Provider>
);
}