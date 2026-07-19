import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Login from './components/Login';
import Signup from './components/Signup';
import AddSnippet from './components/AddSnippet';
import EditSnippet from './components/EditSnippet';
import { useState, useEffect } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState('home');
  const [snippets, setSnippets] = useState([]);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const isLoggedIn = !!localStorage.getItem('token');

  const fetchSnippets = () => {
    const token = localStorage.getItem('token');
    fetch('https://codesnip-2dmh.onrender.com/snippets', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setSnippets(data));
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`https://codesnip-2dmh.onrender.com/snippets/${id}`, {
      method: 'DELETE',
    });
    fetchSnippets();
  };

  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setPage('edit');
  };

  const filtered = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(search.toLowerCase()) ||
    snippet.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar
        onLoginClick={() => setPage('login')}
        onHomeClick={() => setPage('home')}
        onSignupClick={() => setPage('signup')}
        onAddClick={() => setPage('add')}
        isLoggedIn={isLoggedIn}
      />
      {page === 'home' && (
        <div>
          <input
            type="text"
            placeholder="Search snippets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="cards-grid">
            {filtered.map((snippet, index) => (
              <Card
                key={index}
                id={snippet._id}
                title={snippet.title}
                language={snippet.language}
                code={snippet.code}
                onDelete={handleDelete}
                onEdit={() => handleEdit(snippet)}
              />
            ))}
          </div>
        </div>
      )}
      {page === 'login' && (
        <Login onSwitchToSignup={() => setPage('signup')} />
      )}
      {page === 'signup' && (
        <Signup onSwitchToLogin={() => setPage('login')} />
      )}
      {page === 'add' && (
        <AddSnippet onSnippetAdded={() => {
          fetchSnippets();
          setPage('home');
        }} />
      )}
      {page === 'edit' && editingSnippet && (
        <EditSnippet
          snippet={editingSnippet}
          onSnippetUpdated={() => {
            fetchSnippets();
            setPage('home');
          }}
          onCancel={() => setPage('home')}
        />
      )}
    </div>
  );
}

export default App;