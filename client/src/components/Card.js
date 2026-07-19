import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';

function Card({ title, language, code, id, onDelete, onEdit }) {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const getLanguageExtension = () => {
    switch (language) {
      case 'Python': return [python()];
      case 'Java': return [java()];
      default: return [javascript()];
    }
  };

  const handleExplain = async () => {
    setLoading(true);
    setExplanation('');
    const response = await fetch('https://codesnip-2dmh.onrender.com/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language }),
    });
    const data = await response.json();
    setExplanation(data.explanation);
    setLoading(false);
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{language}</p>
      <CodeMirror
        value={code}
        height="150px"
        theme={oneDark}
        extensions={getLanguageExtension()}
        editable={false}
      />
      <div className="card-buttons">
        <button onClick={() => navigator.clipboard.writeText(code)}>Copy</button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={handleExplain}>✨ Explain</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
      {loading && <p className="explanation">🤖 Explaining...</p>}
      {explanation && <p className="explanation">{explanation}</p>}
    </div>
  );
}

export default Card;