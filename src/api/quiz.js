import {axios} from ".";


export const getAllQuiz = async () => {
  const { data } = await axios.get(`quiz`)
      return data;
}


export const getQuizById = async (id) => {
  const { data } = await axios.get(`quiz/${id}`);
  return data;
}


export const create = async ({category_id, difficulty_id, question, correct_answer, author, incorrect_answers}) => {
  const {data} = await axios.post(`quiz/`,{
      category_id,
      difficulty_id,
      question,
      correct_answer,
      author,
      incorrect_answers
  });
  return data;
}

export const deleteQuiz = async (id) => {
  await axios.delete(`quiz/${id}`);

}
export const getQuizesByCategorieAndDifficulty = async (category, difficulty) => {
  return await axios.get(`quiz/${category}/${difficulty}`)
}

export const getNotApprovedQuizes = async () => {
  return await axios.get(`quiz/admin`);
}


export const approveQuiz = async (id) => {
  const {data} = await axios.post(`quiz/admin/${id}`);
  return data;
} 