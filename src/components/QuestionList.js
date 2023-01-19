import React,{useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions,setQuestions]=useState([]);

  const apiUrl = "http://localhost:4000/questions";


  useEffect(()=>{
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => setQuestions(data))
  },[])

  // console.log(questions);

  const deleteQuiz = async(id)=>{
    const res = await fetch(`http://localhost:4000/questions/${id}`,{method: "DELETE",
  headers:{'content-type': 'application/json','Accept' : 'application/json'}});

  const jsonFile = await res.json()
  console.log(jsonFile)
  setQuestions(prevQuiz => prevQuiz.filter(question => question.id !== id))
  }

  const quizes = questions.map((quiz)=>{
    return(<QuestionItem key={quiz.id} question={quiz} deleteQuiz={deleteQuiz}/>)
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quizes}</ul>
    </section>
  );
}

export default QuestionList;
