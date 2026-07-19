import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';

function AddSnippet({ onSnippetAdded }) {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const getLanguageExtension = () => {
    switch (language) {
      case 'Python': return [python()];
      case 'Java': return [java()];
      default: return [javascript()];
    }
  };

  const handleSubmit = async () => {
    if (!title || !language || !code) {
      setMessage('Please fill all fields!');
      return;
    }
    const token = localStorage.getItem('token');
    const response = await fetch('https://codesnip-2dmh.onrender.com/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, language, code }),
    });
    const data = await response.json();
    if (data._id) {
      setMessage('Snippet added successfully!');
      setTitle('');
      setLanguage('JavaScript');
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
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="CPP">C++</option>
          <option value="CSS">CSS</option>
          <option value="HTML">HTML</option>
        </select>
        <CodeMirror
          value={code}
          height="250px"
          theme={oneDark}
          extensions={getLanguageExtension()}
          onChange={(value) => setCode(value)}
        />
        <button onClick={handleSubmit}>Save Snippet</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default AddSnippet;