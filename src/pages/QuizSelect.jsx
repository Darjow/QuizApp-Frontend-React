import {useForm, FormProvider} from 'react-hook-form';

import { useHistory } from 'react-router';
import { useSession } from '../contexts/AuthProvider';
import LabelSelect from '../components/component/LabelSelect';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../components/component/Loader';
import { getAllCategories } from '../api/categories';
import {getAllDifficulties} from '../api/difficulties'
import { getQuizesByCategorieAndDifficulty } from '../api/quiz';
import { useQuizes } from '../contexts/QuizProvider';

export default function SelectQuiz(){

  const methods = useForm({reValidateMode:"onChange"});
  const {handleSubmit} = methods;
  const {user, loading} = useSession();
  const history = useHistory();
  const [categories, setCategories] = useState(null); 
  const [difficulties, setDifficulties] = useState(null);
  const [error, setError] = useState(null);
  const {setCurrentQuiz} = useQuizes();

  useEffect(() => {    
    const request = async () => {
      if(user){
        const difficulties = await getAllDifficulties();
        setDifficulties(difficulties);
        const categories = await getAllCategories ();
        setCategories(categories );
      }
    }
    request();
  }, [user])

  const handleShowQuiz = useCallback( async (formdata) => {
    setError(null);
    const quizes = await getQuizesByCategorieAndDifficulty(formdata.category, formdata.difficulty);
    if(quizes.data.length !== 0){
      let quiz;
      if(quizes.data.length === 1){
        quiz = quizes.data[0]
      }else{
        quiz = quizes.data.data[Math.floor(Math.random() * quizes.data.length)]
      }
      setCurrentQuiz(quiz);
      history.push(`/play`)
    }else{
      setError("No quizes found with these parameters.")
    }
  }, [history, setCurrentQuiz])

  const removeErrors = useCallback(() => {
    if(error){
      console.log("yo");
      setError(null);
    }
  },[error])
  
  if(!user || loading || !categories || !difficulties) return <Loader />


  return(
    <div className="select-container">
      <h2 className='header-select'>Select a quiz</h2>
      <FormProvider {...methods}>
        <form className="quiz-form" onSubmit={handleSubmit(handleShowQuiz)}>
          <LabelSelect label={"category"} options={categories} required={false} onClick={removeErrors}/>
          <LabelSelect label={"difficulty"} options={difficulties} required={false}/>
          <button type="submit" className='submit-answer'>Play</button>
        </form>
      </FormProvider>
      {error? (<p className="text-red-500 bg-white">{error}</p>): (null)}
    </div>

    
  

  )
}



  /*
  useEffect(() => {
    const request = async() => {
      if(user){
        const resp = await simpleReq("/category", "get")
        setCategories(resp.data);
      }
    }
    request(); 
  }, [user])
  */