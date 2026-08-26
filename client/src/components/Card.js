import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';
import { GlobeIcon, LockIcon, SparklesIcon, BotIcon, CheckCircleIcon } from './icons';


function Card({ title, language, code, id, onDelete, onEdit, isPublic, onVisibilityChange }) {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [public_, setPublic_] = useState(isPublic);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleVisibility = async () => {
    const newValue = !public_;
    setPublic_(newValue);
    await fetch(`https://codesnip-2dmh.onrender.com/snippets/${id}/visibility`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPublic: newValue }),
    });
    if (newValue) {
  const link = `${window.location.origin}/snippet/${id}`;
  navigator.clipboard.writeText(link);
  setCopiedLink(true);
  setTimeout(() => setCopiedLink(false), 3000);
}
  };

  return (
    <div className="card">
      <div className="card-header-row">
        <h3>{title}</h3>
        <span
          className={`visibility-badge ${public_ ? 'public' : 'private'}`}
          onClick={handleVisibility}
        >
          {public_ ? <><GlobeIcon width={13} height={13} /> Public</> : <><LockIcon width={13} height={13} /> Private</>}
        </span>
      </div>
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
        <button className="btn-explain" onClick={handleExplain}><SparklesIcon width={14} height={14} /> Explain</button>
        <button className="btn-delete" onClick={() => onDelete(id)}>Delete</button>
      </div>
      {loading && <p className="explanation"><BotIcon width={14} height={14} /> Explaining...</p>}
      {explanation && <p className="explanation">{explanation}</p>}
      {copiedLink && (
  <div className="link-copied">
    <CheckCircleIcon width={14} height={14} /> Public link copied to clipboard!
  </div>
)}
    
    </div>
    
  );
}

export default Card;