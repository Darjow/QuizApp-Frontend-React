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


  const {ready: authReady} = useSession();

  

  const refreshQuizes = useCallback(async () => {
    try{
      setError();
      setLoading(true);
      const data = await quizApi.getAllQuiz();
      const data2 = await quizApi.getNotApprovedQuizes();
      setQuizes(data.data);
      setNotApprovedQuizes(data2.data);
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


const value = useMemo( () => ({
  quizes,
  error,
  loading,
  currentQuiz,
  deleteQuiz,
  setCurrentQuiz,
  notApprovedQuizes,
  approveQuiz

}),
[
  quizes,
  error,
  loading,
  currentQuiz,
  deleteQuiz,
  setCurrentQuiz,
  notApprovedQuizes,
  approveQuiz
]
);

return (
  <quizContext.Provider value={value}>
    {children}
  </quizContext.Provider>
);
}