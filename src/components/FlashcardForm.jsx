import React, { useState } from 'react';

function FlashcardForm({ onAddFlashcard, onClose }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !summary || !prompt) {
      alert('Please fill in all fields.'); // Basic validation
      return;
    }

    const newFlashcard = {
      title,
      summary,
      prompt,
    };

    onAddFlashcard(newFlashcard); // Pass the new flashcard to the parent component
    onClose(); // Close the modal

    // Clear the form
    setTitle('');
    setSummary('');
    setPrompt('');
  };

  return (
    <div className="flashcard-form">
      <h2>Add New Flashcard</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prompt">Prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button type="submit">Save and Close</button> {/* Changed button text */}
      </form>
    </div>
  );
}

export default FlashcardForm;