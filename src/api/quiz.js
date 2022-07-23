import {axios} from ".";


export const getAllQuiz = async () => {
  const { data } = await axios.get(`quiz`, {
    param:{
      limit: 25,
      offset: 0,
    },
  });
  
  return data;
}


export const safeQuiz = async ({id, category, type, difficulty, question, correct_answer, author, incorrect_answers }) => {
  const {data} = await axios.get({
    method: id? "put": "post",
    url:`quiz/${id ?? ""}`,
    data:{
      category,
      type,
      difficulty,
      question,
      correct_answer,
      author,
      incorrect_answers
    }
  });
  return data;
}

export const deleteQuiz = async (id) => {
  await axios.delete(`quiz/${id}`);

}