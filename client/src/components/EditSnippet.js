import { useState } from 'react';

function EditSnippet({ snippet, onSnippetUpdated, onCancel }) {
  const [title, setTitle] = useState(snippet.title);
  const [language, setLanguage] = useState(snippet.language);
  const [code, setCode] = useState(snippet.code);
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    if (!title || !language || !code) {
      setMessage('Please fill all fields!');
      return;
    }

    const response = await fetch(`https://codesnip-2dmh.onrender.com/snippets/${snippet._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, language, code }),
    });

    const data = await response.json();
    if (data._id) {
      setMessage('Snippet updated!');
      onSnippetUpdated();
    }
  };

  return (
    <div className="add-snippet-container">
      <h2>Edit Snippet</h2>
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
        <button onClick={handleUpdate}>Update Snippet</button>
        <button onClick={onCancel}>Cancel</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default EditSnippet;