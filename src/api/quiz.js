import {axios} from ".";


export const getAllQuiz = async () => {
  const { data } = await axios.get(`quiz`)
      return data;
}


export const getQuizById = async (id) => {
  const { data } = await axios.get(`quiz/${id}`);
  return data;
}


export const create = async ({category, difficulty, question, correct_answer, author, incorrect_answers}) => {
  const {data} = await axios.post(`quiz/`,{
      category,
      difficulty,
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
  const {data} = await axios.get(`quiz/${category}/${difficulty}`)
  return data;
}

export const getNotApprovedQuizes = async () => {
  const data =  axios.get(`quiz/admin`);
  return data;
}


export const approveQuiz = async (id) => {
  const {data} = await axios.post(`quiz/admin/${id}`);
  return data;
} 