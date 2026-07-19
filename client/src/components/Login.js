import { useState } from 'react';

function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const response = await fetch('https://codesnip-2dmh.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
     localStorage.setItem('token', data.token);
     localStorage.setItem('userId', data.userId);
     setMessage('Login successful!');
     setTimeout(() => window.location.reload(), 1000);
     }
     else {
      setMessage(data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back!</h2>
      <p>Login to your CodeSnip account</p>
      <div className="auth-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {message && <p className="message">{message}</p>}
        <p>Don't have an account? <span onClick={onSwitchToSignup}>Sign Up</span></p>
      </div>
    </div>
  );
}

export default Login;