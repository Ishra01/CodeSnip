import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Login from './components/Login';
import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/snippets')
      .then(res => res.json())
      .then(data => setSnippets(data));
  }, []);

  const filtered = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(search.toLowerCase()) ||
    snippet.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar onLoginClick={() => setShowLogin(true)} />
      {showLogin ? (
        <Login />
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search snippets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {filtered.map((snippet, index) => (
            <Card
              key={index}
              title={snippet.title}
              language={snippet.language}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;