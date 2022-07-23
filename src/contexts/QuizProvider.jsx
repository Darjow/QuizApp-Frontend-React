import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

import * as quizApi from "../api/quiz";

export const quizContext = createContext();
export const useQuizes = () => useContext(quizContext);

export const QuizesProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({});

  //const {ready: authReady} = useSession();

  const refreshQuizes = useCallback(async () => {
    try{
      setError();
      setLoading(true);
      const data = await quizApi.getAllQuiz();
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
    if(!initialLoad){
      refreshQuizes();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshQuizes]);


const createOrUpdateQuiz = useCallback( async ({id, category, type, difficulty, question, correct_answer, approved, author, incorrect_anwers}) => {
  setError();
  setLoading(true);
  try{
    await quizApi.safeQuiz({id, category, type, difficulty, question, correct_answer, approved, author, incorrect_anwers});
    await refreshQuizes();
  }catch(error){
    console.log(error);
    throw error;
  }finally{
    setLoading(false);
  }
}, [refreshQuizes]

);

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

/*
const setQuizToUpdate  = useCallback( (id) => {
  setCurrentQuiz(id === null? {} : quizes.find((e) => e.id === id)
  );
}, [quizes]
);
*/

const value = useMemo( () => ({
  quizes,
  error,
  loading,
  currentQuiz,
  createOrUpdateQuiz,
  deleteQuiz,
  setCurrentQuiz
}),
[
  quizes,
  error,
  loading,
  currentQuiz,
  createOrUpdateQuiz,
  deleteQuiz,
  setCurrentQuiz
  //setQuizToUpdate
]
);

return (
  <quizContext.Provider value={value}>
    {children}
  </quizContext.Provider>
);
}