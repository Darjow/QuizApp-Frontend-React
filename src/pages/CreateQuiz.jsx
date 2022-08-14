import { useForm, FormProvider } from "react-hook-form";
import { useQuizes } from "../contexts/QuizProvider"
import LabelSelect from "../components/component/LabelSelect";
import { useCallback } from "react";
import { useSession } from "../contexts/AuthProvider";
import LabelInput from "../components/component/LabelInput";
import { Button } from "../components/component/Button";
import { toSelectList } from "../util/Enum";
import { Difficulties, Categories } from "../util/Enum";
import { SuccessToast, ErrorToast } from "../util/Toast";
import { useHistory } from "react-router";



export default function CreateQuiz(){

  const methods = useForm();

  const {handleSubmit, getValues} = methods;
  const {createQuiz} = useQuizes();
  const {user} = useSession();
  const history = useHistory();



  const validationRules = {
    question: {required: "Required", minLength: {value: 10, message: "The question is too small" }, maxLength: {value: 150, message: "The question is too long"}},
    category:{required: "Required"},   
    difficulty: {required: "Required"},
    incorrect_answers_required: {required: "Required", maxLength: {value: 25, message: "The answer is too long."}, validate: {
      notIdentical: value => {
        return getValues("False Answer 2") !== value && getValues("False Answer 3") !== value? null : "False answers cannot be the same"
      }
    }},
    incorrect_answers_not_required: {maxLength: {value: 25, message: "The answer is too long"}, validate: {
      notIdentical: value => {
        return value === ""? null : getValues("False Answer 2") !== getValues("False Answer 3")?  null: "False answers cannot be the same"
      }
    }},
    correct_answer: {required: "Required", maxLength:{value: 25, message: "The answer is too long"}, validate:{
      notIdentical: value => {
        return getValues("False Answer 1") !== value && getValues("False Answer 2") !== value && getValues("False Answer 3") !== value? null :  "Correct answer is the same as a false answer"  }}}
}
  
  
  

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
        category: data.Category,
        difficulty: data.Difficulty,
        correct_answer: data["Correct Answer"],
        incorrect_answers: incorrect_answs,
        author: user.username,        
      });
      SuccessToast("Succesfully created a new quiz.")
      history.push("/");

    }catch(ex){
      console.log(ex);
      ErrorToast("Error creating a new quiz.")
    }
  },[createQuiz, user, history])

 
  return(
    <div className="select-container">
        <h2 className="header-select">Create a quiz</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="quiz-form">
          <div>
          <LabelInput
            label="Question"
            type="text"
            validation={validationRules.question}
            required={true}
            data-cy="question-input"
          />
          <LabelSelect
            label="Category"
            options={toSelectList(Categories)}
            required={true}
            validation={validationRules.category}
            data-cy="category-input"
          />
          <LabelSelect
            label="Difficulty"
            options={toSelectList(Difficulties)}
            required={true}
            validation={validationRules.difficulty}
            data-cy="difficulty-input"
          /> 
          <LabelInput
            label="Correct Answer"
            type="text"
            validation={validationRules.correct_answer}
            required={true}
            data-cy="correct_answer-input"
          />
          <LabelInput
            label="False Answer 1"
            type="text"
            validation={validationRules.incorrect_answers_required}
            required={true}
            data-cy="false_answer_1-input"
          />
          <LabelInput
            label="False Answer 2"
            type="text"
            validation={validationRules.incorrect_answers_not_required}
            data-cy="false_answer_2-input"

          />
          <LabelInput
            label="False Answer 3"
            type="text"
            validation={validationRules.incorrect_answers_not_required}
            data-cy="false_answer_3-input"
          />
          <LabelInput
            label="Author"
            type="text"
            value={user.username}
            disabled
            data-cy="author-input"
          />
          <Button type="submit" onClick={handleSubmit(onSubmit)} text="Add quiz" className="submit-answer" data-cy="submit-create_quiz"/>
        </div>  
      </form>
    </FormProvider>
  </div>
)

}


