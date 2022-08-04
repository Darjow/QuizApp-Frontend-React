import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useQuizes } from '../../contexts/QuizProvider';
import { Difficulties, Categories } from '../../util/Enum';
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
  <div className="overflow-auto mt-10">
    <table className="sm:table-auto table-fixed m-auto w-screen">
    <thead className='border-solid border-3 border-white'>
      <tr>
        <th className='text-center px-6'>Question</th>
        <th className='text-center px-6'>Category</th>
        <th className='text-center px-6'>Type</th>
        <th className='text-center px-6'>Difficulty</th>
        <th className='text-center px-6'>Correct Answer</th>
        <th className='text-center px-6' colSpan={3}>Incorrect Answers</th>
        <th className='text-center px-6'>Author</th>
        <th className='bg-white'colSpan={2}/>
        
    </tr>
    </thead>
    <tbody>
      {notApprovedQuizes.map((quiz) => {
        return (
          <tr>
            <td className='text-center'> {quiz.question}</td>
            <td className="text-center">{Categories[quiz.category_id]}</td>
            <td className="text-center">{quiz.type}</td>
            <td className="text-center">{Difficulties[quiz.difficulty_id]}</td>
            <td className="text-center">{quiz.correct_answer}</td>
            <td className="text-center px-6">{quiz.incorrect_answers[0]}</td>
            <td className="text-center px-6">{quiz.incorrect_answers[1]}</td>
            <td className="text-center px-6">{quiz.incorrect_answers[2]? `${quiz.incorrect_answers[2]}` : ""}</td>
            <td className="text-center border-solid border-r-3">{quiz.author}</td>
            <td className='bg-white'><Button className='w-full' variant='contained' color='success' size='small' id={quiz.id} onClick={handleApprove}>Approve</Button></td>
            <td className='bg-white'><Button className='w-full' variant='contained' color='error' size="small" id={quiz.id}  onClick={handleDeny}>Deny</Button></td>
          </tr>
        )
      })}
    </tbody>
    </table>
    </div>
    )
  }

}
  