import React, { useState } from 'react';
import './App.css';
import FlashcardForm from './components/FlashcardForm';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [flashcards, setFlashcards] = useLocalStorage('flashcards', [
    { law: 1, title: 'Never Outshine the Master', summary: 'Always make those above you feel superior. If you make them feel like you are more talented, you risk their wrath.', prompt: 'Have you ever unintentionally challenged someone in authority?' },
    { law: 2, title: 'Never Put Too Much Trust in Friends, Learn How to Use Enemies', summary: 'Friends can betray out of emotion, enemies have more to prove. Use enemies to your advantage.', prompt: 'Have you overlooked an enemy\'s potential as an ally?' },
    { law: 3, title: 'Conceal Your Intentions', summary: 'If others don’t know what you\'re up to, they can’t interfere. Use misdirection to your advantage.', prompt: 'When did revealing your intentions backfire?' },
    { law: 4, title: 'Always Say Less than Necessary', summary: 'The more you say, the more likely you are to say something foolish. Power often lies in silence.', prompt: 'Have you talked yourself into trouble by overexplaining?' }
  ]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const next = () => {
    setShowAnswer(false);
    setIndex((index + 1) % flashcards.length);
  };

  const prev = () => {
    setShowAnswer(false);
    setIndex((index - 1 + flashcards.length) % flashcards.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addFlashcard = (newFlashcard) => {
    const nextLawNumber = flashcards.length > 0 ? Math.max(...flashcards.map(card => card.law)) + 1 : 1;
    const newFlashcardWithLaw = { ...newFlashcard, law: nextLawNumber };
    setFlashcards([...flashcards, newFlashcardWithLaw]);
  };

  const deleteFlashcard = (law) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (confirmed) {
      const updatedFlashcards = flashcards.filter(card => card.law !== law);
      const renumberedFlashcards = updatedFlashcards.map((card, index) => ({ ...card, law: index + 1 }));
      setFlashcards(renumberedFlashcards);
      setIndex(0); // Reset index after deletion
    }
  };

  return (
    <div className="app-container">
      <h1>Flashcards of Power</h1>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <FlashcardForm onAddFlashcard={addFlashcard} onClose={closeModal} />
          </div>
        </div>
      )}

      <div className="card">
        <h2>{`Law ${flashcards[index]?.law}: ${flashcards[index]?.title}`}</h2>
        {showAnswer ? (
          <div>
            <p><strong>Summary:</strong> {flashcards[index]?.summary}</p>
            <p><strong>Reflection:</strong> {flashcards[index]?.prompt}</p>
          </div>
        ) : (
          <p>Click "Show Answer" to reveal</p>
        )}

        <div className="navigation-buttons">
          <button onClick={prev} disabled={flashcards.length === 0}>Previous</button>
          <button onClick={() => setShowAnswer(!showAnswer)} disabled={flashcards.length === 0}>Show Answer</button>
          <button onClick={next} disabled={flashcards.length === 0}>Next</button>
        </div>
      </div>

      <div className="management-buttons">
        <button className="add-card-button" onClick={openModal}>Add Card</button>
        <button className="delete-button" onClick={() => deleteFlashcard(flashcards[index]?.law)} disabled={flashcards.length === 0}>Delete</button>
      </div>
    </div>
  );
}

export default App;