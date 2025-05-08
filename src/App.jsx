import React, { useState } from 'react';
import './App.css';

const flashcards = [
  { law: 1, title: 'Never Outshine the Master', summary: 'Always make those above you feel superior. If you make them feel like you are more talented, you risk their wrath.', prompt: 'Have you ever unintentionally challenged someone in authority?' },
  { law: 2, title: 'Never Put Too Much Trust in Friends, Learn How to Use Enemies', summary: 'Friends can betray out of emotion, enemies have more to prove. Use enemies to your advantage.', prompt: "Have you overlooked an enemy's potential as an ally?" },
  { law: 3, title: 'Conceal Your Intentions', summary: "If others don’t know what you're up to, they can’t interfere. Use misdirection to your advantage.", prompt: 'When did revealing your intentions backfire?' },
  { law: 4, title: 'Always Say Less than Necessary', summary: 'The more you say, the more likely you are to say something foolish. Power often lies in silence.', prompt: 'Have you talked yourself into trouble by overexplaining?' }
];

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
