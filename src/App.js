

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:5000/questions')
      .then(response => {
        setQuestions(response.data);
        
        setUserAnswers(Array(response.data.length).fill(''));
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    
    axios.post('http://localhost:5000/submit', { answers: userAnswers })
      .then(response => {
        setScore(response.data.score);
      })
      .catch(error => {
        console.error('Error submitting answers:', error);
      });
  };

  return (
    <div>
      <h1>Quiz Game</h1>
      {questions.map((question, index) => (
        <div key={question.id}>
          <p>{question.question}</p>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <p>Your score is: {score}</p>}
    </div>
  );
};

export default QuizApp;
