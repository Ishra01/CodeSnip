import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const snippets = [
    { title: 'Array forEach example', language: 'JavaScript' },
    { title: 'Python list comprehension', language: 'Python' },
    { title: 'Java for loop', language: 'Java' },
  ];

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