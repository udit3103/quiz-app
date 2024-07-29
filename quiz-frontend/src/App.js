import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  const [question, setQuestion] = useState(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/question');
      setQuestion(response.data);
    } catch (error) {
      console.error('Error fetching the question:', error);
    }
  };

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === question.answer.toLowerCase()) {
      setScore(score + 1);
      setMessage('Correct!');
    } else {
      setWrongAnswers(wrongAnswers + 1);
      setMessage(`Wrong! The correct answer was: ${question.answer}`);
    }

    if (round >= 10) {
      setWin(true);
      setGameOver(true);
    } else if (wrongAnswers >= 2) {
      setGameOver(true);
    } else {
      setRound(round + 1);
      fetchQuestion();
    }

    setAnswer('');
  };

  const handleRestart = () => {
    setRound(1);
    setScore(0);
    setWrongAnswers(0);
    setAnswer('');
    setMessage('');
    setGameOver(false);
    setWin(false);
    fetchQuestion();
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <h1 className="text-center">Historical Quiz Game</h1>
          {gameOver ? (
            <Alert variant={win ? 'success' : 'danger'} className="text-center">
              {win ? 'Congratulations, you won!' : 'Game Over!'}
              <div>
                <Button variant="primary" onClick={handleRestart} className="mt-3">Restart</Button>
              </div>
            </Alert>
          ) : (
            <Card>
              <Card.Body>
                <Card.Title>Round {round}</Card.Title>
                <Card.Text>
                  <strong>Question:</strong> {question.question}
                </Card.Text>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  placeholder="Enter your answer"
                />
                <Button variant="primary" onClick={handleSubmit} className="mt-3">Submit</Button>
                {message && <Alert variant="info" className="mt-3">{message}</Alert>}
                <div className="mt-3">
                  <strong>Score:</strong> {score} | <strong>Wrong Answers:</strong> {wrongAnswers}
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;