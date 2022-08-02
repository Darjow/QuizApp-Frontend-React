import { useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useQuizes } from "../contexts/QuizProvider"
import { useEffect } from "react";
import { useGames } from "../contexts/GamesProvider";
import { useSession } from "../contexts/AuthProvider";
import DynamicButton from "../components/component/DynamicButton";





export default function PlayQuiz() {
  const {currentQuiz } = useQuizes();
 const {createGame}= useGames();
 const {user} = useSession();

  const [answer, setAnswer] = useState(null);  
  const [answers, setAnswers] = useState([]);
  const [played, setPlayed] = useState(false);
 const [points, setPoints] = useState(null);


  const history = useHistory();


  const positionAnswers = useEffect(()  => {
    let temp = [];
    if(Object.keys(currentQuiz).length !== 0){
      temp = currentQuiz.incorrect_answers;
      temp.push(currentQuiz.correct_answer)
      temp = temp.sort(() => (Math.random() > .5) ? 1 : -1);
      setAnswers(temp);
  }
  },[currentQuiz])


  const handleSubmitAnswer= useCallback (async () => {
    if(answer != null){
      let won = (currentQuiz.correct_answer === answer);

      const calculatePointsChange = () => {
        switch(answers.length){
          case 2:   return (won? 25  : -50);
          case 3:    return (won? 50 : -50);
          case 4:  return (won? 100 : -25);
          default:  return 0;
        }
      }

      document.getElementById(answer).className = `answer answer-${won?"correct":"wrong"}`
      document.getElementById(answer).insertAdjacentHTML("beforeEnd", `<span className='points-${won? "won":"lost"}'>  (${calculatePointsChange() < 0? calculatePointsChange() : ("+" + calculatePointsChange())})`);
      
      setPoints(calculatePointsChange());
      await createGame(user.id, currentQuiz.id, calculatePointsChange());
      setPlayed(true);

    

    }
  }, [answer, currentQuiz, createGame, user, answers]);




  const handleChange = (e) => {
    if(!played){
      for(let x of document.getElementsByClassName("answer")){
        x.className = "answer";
      }
      e.target.className = "answer answer-active";
      setAnswer(e.target.innerHTML);
    }
  }


    if(Object.keys(currentQuiz).length === 0){
      history.replace("/home");
      return (<></>);
    }
    else{
      return (
      <div className="quiz-container quiz" id="quiz-container">
      <div className="quiz-header">
        <h2 className="question">{currentQuiz.question}</h2>
        <h3 className="author-header">by <span className="author">{currentQuiz.author}</span></h3>
        <ul className="list-container">   
        {answers.map((answer) => {
          return(<li>
            <label className="answer"  id={answer} onClick={handleChange}>{answer}</label>
          </li>
          )
          })}
          <li><label class="total-points">Total Score: {(user.score + points )}</label></li></ul>
      </div>
      <DynamicButton className="submit-answer" transformed={played} onClick={handleSubmitAnswer} href="/select"/>

    </div>
      )
        }
        
      }