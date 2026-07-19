import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';

function PublicSnippet({ snippetId }) {
  const [snippet, setSnippet] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://codesnip-2dmh.onrender.com/snippets/public/${snippetId}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) setError(data.message);
        else setSnippet(data);
      });
  }, [snippetId]);

  const getLanguageExtension = () => {
    if (!snippet) return [javascript()];
    switch (snippet.language) {
      case 'Python': return [python()];
      case 'Java': return [java()];
      default: return [javascript()];
    }
  };

  if (error) return (
    <div className="auth-container">
      <h2>❌ Snippet not found!</h2>
      <p>This snippet is private or doesn't exist.</p>
    </div>
  );

  if (!snippet) return (
    <div className="auth-container">
      <h2>Loading...</h2>
    </div>
  );

  return (
    <div className="add-snippet-container">
      <h2>{snippet.title}</h2>
      <p className="language-tag">{snippet.language}</p>
      <CodeMirror
        value={snippet.code}
        height="400px"
        theme={oneDark}
        extensions={getLanguageExtension()}
        editable={false}
      />
      <button
        className="copy-btn"
        onClick={() => navigator.clipboard.writeText(snippet.code)}
      >
        Copy Code
      </button>
    </div>
  );
}

export default PublicSnippet;