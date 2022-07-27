import {axios} from ".";


export const getAllQuiz = async () => {
  const { data } = await axios.get(`quiz`)
      return data;
}


export const getQuizById = async (id) => {
  const { data } = await axios.get(`quiz/${id}`);
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

export const getQuizesByCategorieAndDifficulty = async (category, difficulty) => {
  return await axios.get(`quiz/${category}/${difficulty}`)
}