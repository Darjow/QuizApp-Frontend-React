import React, { useContext, useMemo } from "react";
import { quizContext } from "../../contexts/QuizProvider";
import { Quiz } from "./Quiz";

export default function QuizList({ category }) {
  const { quizes, error, loading } = useContext(quizContext);
  const filteredQuiz = useMemo(() => {
    if(!category){
      return quizes;
    }else{
    return quizes.filter((t) => {
      return t.category.toLowerCase().equals(category.toLowerCase())
    });
  }
  }, [quizes, category]);

  if (loading) return <h1 data-cy="loading">Loading...</h1>;
  if (error)
    return (
      <p data-cy="transactions_error" className="error">
        {JSON.stringify(error, null, 2)}
      </p>
    );
  if (!quizes || !quizes.length) {
    return (
      <p className="info flex flex-row items-center">
        <span className="flex-1">There are no quizes</span>
      </p>
    );
  }

  return (
    <table className="table-fixed m-auto">
      <thead>
        <tr>
          <th>Date</th>
          <th>User</th>
          <th>What?</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredQuiz.map((e) => {
         return <p>{e.id}</p> //return <Quiz key={e.id} {...e} />;
        })}
      </tbody>
    </table>
  );
}