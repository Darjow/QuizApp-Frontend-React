import Button from '@mui/material/Button';
import { useQuizes } from '../../contexts/QuizProvider';
const _enum = require("../../core/enum")

export default function QuizList() {

  const {deleteQuiz, notApprovedQuizes, approveQuiz} = useQuizes();

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
    <table className="m-auto">
    <thead className='border-b-2 border-gray-200'>
      <tr>
        <th className='border-solid border-3 tracking-wide text-center px-6'>Question</th>
        <th className='border-solid border-3 tracking-wide text-center px-6'>Category</th>
        <th className='border-solid border-3 tracking-wide text-center px-6'>Type</th>
        <th className='border-solid border-3 tracking-wide text-center px-6'>Difficulty</th>
        <th className='border-solid border-3 tracking-wide text-center px-6'>Correct Answer</th>
        <th className='border-solid border-3 tracking-wide text-center px-6' colSpan={3}>Incorrect Answers</th>
        <th className='border-solid border-3 tracking-wide text-center px-6'>Author</th>
        <th colSpan={2}/>
    </tr>
    </thead>
    <tbody>
      {notApprovedQuizes.map((quiz) => {
        return (
          <tr className='border-solid border-3'>
            <td className='text-center'> {quiz.question}</td>
            <td className="text-center">{_enum.Categories[quiz.category_id]}</td>
            <td className="text-center">{quiz.type}</td>
            <td className="text-center">{_enum.Difficulty[quiz.difficulty_id]}</td>
            <td className="text-center">{quiz.correct_answer}</td>
            <td className="text-center px-6">1. {quiz.incorrect_answers[0]}</td>
            <td className="text-center px-6">2. {quiz.incorrect_answers[1]}</td>
            <td className="text-center px-6">{quiz.incorrect_answers[2]? `3. ${quiz.incorrect_answers[2]}hhhhhhh` : ""}</td>
            <td className="text-center border-solid border-r-3">{quiz.author}</td>
            <td><Button variant='contained' color='success' size='small' id={quiz.id} onClick={handleApprove}>Approve</Button></td>
            <td><Button variant='contained' color='error' size="small" id={quiz.id}  onClick={handleDeny}>Deny</Button></td>
          </tr>
        )
      })}
    </tbody>
    </table>
    </div>
    )
  }

}
  