import { useForm, FormProvider } from "react-hook-form";
import { useQuizes } from "../contexts/QuizProvider"
import LabelSelect from "../components/component/LabelSelect";
import { useCallback } from "react";
import { useSession } from "../contexts/AuthProvider";
import LabelInput from "../components/component/LabelInput";
import { Button } from "../components/component/Button";
import Loader from "../components/component/Loader";
import { toSelectList } from "../util/Enum";
import { Difficulties, Categories } from "../util/Enum";

const validationRules = {
  question: {required: "This is required", minLength: {value: 10, message: "Min length is 10" }, maxLength: {value: 150, message: "Max length is 50"}},
  category:{required: "This is required"},   
  difficulty: {required: "This is required"},
  incorrect_answers_required: {required: "This is required", maxLength: {value: 25, message: "Max length is 25."}},
  incorrect_answers_not_required: {maxLength: {value: 25, message: "Max length is 25."}},
  correct_answer: {required: "This is required", maxLength:{value: 25, message: "Max length is 50"}},
}





export default function CreateQuiz(){

  const methods = useForm();

  const {handleSubmit} = methods;
  const {createQuiz} = useQuizes();
  const {user} = useSession();


  const onSubmit = useCallback( async (data) => {
    try{
      let incorrect_answs = [];
      for (let i = 1; i <= 3; i++){
        if(data[`False Answer ${i}`] !== ""){
          incorrect_answs.push(data[`False Answer ${i}`]);
        }
      }
      let question = data.Question;
      if(question.at(-1) !== "?"){
        question = question.concat("?");
      }

      await createQuiz({
        question: question,
        category_id: data.Category,
        difficulty_id: data.Difficulty,
        correct_answer: data["Correct Answer"],
        incorrect_answers: incorrect_answs,
        author: user.username,        
      });
    }catch(ex){
      console.log(ex);
    }
  },[createQuiz, user])

  if(!user){
    return <Loader/>
  }else{
  return(
    <div className="select-container">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="quiz-form">
          <div>
          <LabelInput
            label="Question"
            type="text"
            validation={validationRules.question}
            required={true}
          />
          <LabelSelect
            label="Category"
            options={toSelectList(Categories)}
            required={true}
            validation={validationRules.category}
          />
          <LabelSelect
            label="Difficulty"
            options={toSelectList(Difficulties)}
            required={true}
            validation={validationRules.difficulty}
          /> 
          <LabelInput
            label="Correct Answer"
            type="text"
            validation={validationRules.correct_answer}
            required={true}
          />
          <LabelInput
            label="False Answer 1"
            type="text"
            validation={validationRules.incorrect_answers_required}
            required={true}
          />
          <LabelInput
            label="False Answer 2"
            type="text"
            validation={validationRules.incorrect_answers_not_required}
          />
          <LabelInput
            label="False Answer 3"
            type="text"
            validation={validationRules.incorrect_answers_not_required}
          />
          <LabelInput
            label="Author"
            type="text"
            value={user.username}
            disabled
          />

          <div className="col-span-12 sm:col-span-6">
            <div className="flex justify-end">
              <Button type="submit" onClick={handleSubmit(onSubmit)} text="Add quiz" className="submit-answer"/>
            </div>  
          </div>    
        </div>
      </form>
    </FormProvider>
  </div>
)
}
}


