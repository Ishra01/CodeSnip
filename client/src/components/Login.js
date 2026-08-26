import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './icons';

function Login({ onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      localStorage.setItem('userEmail', email);
      setMessage('Login successful!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
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
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        </div>
        <button onClick={handleLogin}>Login</button>
        {message && <p className="message">{message}</p>}
        <p>Don't have an account? <span onClick={onSwitchToSignup}>Sign Up</span></p>
      </div>
    </div>
  );
}

export default Login;