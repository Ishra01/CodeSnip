import { useState } from 'react';

function AddSnippet({ onSnippetAdded }) {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!title || !language || !code) {
      setMessage('Please fill all fields!');
      return;
    }

    const response = await fetch('https://codesnip-2dmh.onrender.com/snippets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, language, code }),
    });

    const data = await response.json();
    if (data._id) {
      setMessage('Snippet added successfully!');
      setTitle('');
      setLanguage('');
      setCode('');
      onSnippetAdded();
    }
  };

  return (
    <div className="add-snippet-container">
      <h2>Add New Snippet</h2>
      <div className="add-snippet-form">
        <input
          type="text"
          placeholder="Snippet title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="CPP">C++</option>
          <option value="CSS">CSS</option>
          <option value="HTML">HTML</option>
        </select>
        <textarea
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows="10"
        />
        <button onClick={handleSubmit}>Save Snippet</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default AddSnippet;