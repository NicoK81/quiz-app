

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Madrid', 'Paris', 'Rome', 'Berlin'],
    answer: 'Paris'
  },
  {
    id: 2,
    question: 'What is the capital of Finland?',
    options: ['Stockholm', 'Oslo', 'Helsinki', 'Reykjavik'],
    answer: 'Helsinki'
  },
  
];

app.get('/questions', (req, res) => {
  res.json(questions);
});

app.post('/submit', (req, res) => {
  const userAnswers = req.body.answers; 

 
  const score = calculateScore(userAnswers);

  res.json({ score });
});

function calculateScore(userAnswers) {
  let score = 0;

  
  for (let i = 0; i < questions.length; i++) {
    
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  return score;
}


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
