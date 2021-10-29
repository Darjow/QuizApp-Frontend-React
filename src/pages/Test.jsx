import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export default function Test() {
  const [Quizes, SetQuizes] = useState();

  useEffect(() => {
    const getQuizes = async() => {
      try{
        const response = await axios.get("http://localhost:9000/api/quizes");
        SetQuizes(response.data);
      } catch(error){
        console.log(error);
      }
    };
    getQuizes();
  },[]);
  return Quizes.map((e) => ( <div>Question: {e.Question}</div>))

    }


