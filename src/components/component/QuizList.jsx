import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useQuizes } from '../../contexts/QuizProvider';

export default function QuizList() {

  const {deleteQuiz, notApprovedQuizes, approveQuiz, refreshQuizes} = useQuizes();


  useEffect(() =>  {
    const refresh = async () => {
      await refreshQuizes();
    }
    refresh();
  },[refreshQuizes])
  
  
  const handleApprove = async (e) => {
   await approveQuiz(e.target.id);

  }
  
  const handleDeny = async (e) => {
    await deleteQuiz(e.target.id);
  }


  if(notApprovedQuizes.length === 0){
     return (<p className="mt-10 ml-10">No quizes are waiting for approval.</p>)
  }else{
    return(
  <div className="overflow-x-auto mt-5">
    <table className="table table-responsive">
    <thead className='border-solid border-3 border-white'>
      <tr>
        <th className='text-center'>Question</th>
        <th className='text-center'>Category</th>
        <th className='text-center'>Difficulty</th>
        <th className='text-center'>Correct Answer</th>
        <th className='text-center' colSpan={3}>Incorrect Answers</th>
        <th className='text-center'>Author</th>
        <th className='bg-white'colSpan={2}/>
        
    </tr>
    </thead>
    <tbody>
      {notApprovedQuizes.map((quiz) => {
        return (
          <tr data-cy="quiz">
            <td className='text-center' data-cy="quiz_question"> {quiz.question}</td>
            <td className="text-center"data-cy="quiz_category">{quiz.category}</td>
            <td className="text-center"data-cy="quiz_difficulty">{quiz.difficulty}</td>
            <td className="text-center"data-cy="quiz_correct_answer">{quiz.correct_answer}</td>
            <td className="text-center px-6" data-cy="quiz_false_answer_1">{quiz.incorrect_answers[0]}</td>
            <td className="text-center px-6" data-cy="quiz_false_answer_2">{quiz.incorrect_answers[1]}</td>
            <td className="text-center px-6" data-cy="quiz_false_answer_3">{quiz.incorrect_answers[2]? `${quiz.incorrect_answers[2]}` : ""}</td>
            <td className="text-center border-solid border-r-3" data-cy="quiz_author">{quiz.author}</td>
            <td className='bg-white'><Button data-cy="submit_approve_quiz" className='w-full' variant='contained' color='success' size='small' id={quiz.id} onClick={handleApprove}>Approve</Button></td>
            <td className='bg-white'><Button data-cy="submit_deny_quiz" className='w-full' variant='contained' color='error' size="small" id={quiz.id}  onClick={handleDeny}>Deny</Button></td>
          </tr>
        )
      })}
    </tbody>
    </table>
    </div>
    )
  }

}
  