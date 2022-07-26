import { useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useQuizes } from "../contexts/QuizProvider"

export default function PlayQuiz() {
  const {currentQuiz} = useQuizes()
  const [answer, setAnswer] = useState(null);  
  const history = useHistory();

  const handleSubmitAnswer= useCallback (async () => {
    if(answer != null){
      //submit game and adjust score
    }

  }, [])

  const handleChange = (e) => {
    for(let x of document.getElementsByClassName("answer")){
      x.className = "answer";
    }
    e.target.className = "answer answer-active";
    setAnswer(e.target.value);
  }

    if(Object.keys(currentQuiz).length === 0){
      history.replace("/home");
      return (<></>);
    }else{
      return (
      <div className="quiz-container quiz">
      <div className="quiz-header">
        <h2 className="question">{currentQuiz.question}</h2>
        <h3 className="author-header">by <span className="author">{currentQuiz.author}</span></h3>
        <ul className="list-container">   
        {currentQuiz.incorrect_answers.map((answer) => {
          return(<li>
            <label className="answer" for={answer} id={answer} onClick={handleChange}>{answer}</label>
          </li>
          )
          })}
        </ul>
      </div>

      <button className="submit-answer" type="submit" onClick={handleSubmitAnswer}>Submit</button>

    </div>
    )
        }
      }