import React, { useState } from 'react';
import './App.css';
import flashcards from './flashcards';

function App() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const card = flashcards[index];

  const next = () => {
    setShowAnswer(false);
    setIndex((index + 1) % flashcards.length);
  };

  const prev = () => {
    setShowAnswer(false);
    setIndex((index - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="App">
      <h1>Flashcards of Power</h1>
      <div className="card">
        <h2>{`Law ${card.law}: ${card.title}`}</h2>
        {showAnswer ? (
          <div>
            <p><strong>Summary:</strong> {card.summary}</p>
            <p><strong>Reflection:</strong> {card.prompt}</p>
          </div>
        ) : (
          <p>Click "Show Answer" to reveal</p>
        )}
      </div>
      <div className="buttons">
        <button onClick={prev}>Previous</button>
        <button onClick={() => setShowAnswer(!showAnswer)}>Show Answer</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}

export default App;
