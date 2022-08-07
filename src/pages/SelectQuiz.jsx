import {useForm, FormProvider} from 'react-hook-form';

import { useHistory } from 'react-router';
import LabelSelect from '../components/component/LabelSelect';
import { useCallback , useState } from 'react';
import { getQuizesByCategorieAndDifficulty } from '../api/quiz';
import { useQuizes } from '../contexts/QuizProvider';
import { toSelectList } from '../util/Enum';
import { Categories, Difficulties } from '../util/Enum';
export default function SelectQuiz(){

  const methods = useForm();
  const {handleSubmit} = methods;
  const history = useHistory();
  const {setCurrentQuiz} = useQuizes();
  const [error, setError] = useState("")

  const handleShowQuiz = useCallback( async (formdata) => {
    setError(null);
    let quizes; 

    try{
      quizes = await getQuizesByCategorieAndDifficulty(formdata.category, formdata.difficulty);
    }catch(error){
      setError("No quizes found with these parameters.")
    }

    if(quizes){
      let quiz;
      if(quizes.data.length === 1){
        quiz = quizes.data[0]
      }else{
        quiz = quizes.data[Math.floor(Math.random() * quizes.data.length)]
      }
      setCurrentQuiz(quiz);
      history.push(`/play`)
    }

    
  }, [history, setCurrentQuiz])

  
  return(
    <div className="select-container">
      <h2 className='header-select'>Select a quiz</h2>
      <FormProvider {...methods}>
        <form className="quiz-form" onSubmit={handleSubmit(handleShowQuiz)}>
          <LabelSelect label={"category"} options={toSelectList(Categories)} required={false}/>
          <LabelSelect label={"difficulty"} options={toSelectList(Difficulties)} required={false}/>
          <button type="submit" className='submit-answer'>Play</button>
        </form>
      </FormProvider>
      {error? (<p className="text-red-500 bg-white">{error}</p>): (null)}
    </div>

    
  

  )
}




  /*
  useEffect(() => {    
    const request = async () => {
        const difficulties = await getAllDifficulties();
        setDifficulties(difficulties);
        const categories = await getAllCategories ();
        console.log(categories);
        setCategories(categories );
      }
    
    request();
  }, [])
  */


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