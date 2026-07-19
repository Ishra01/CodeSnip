import { useState } from 'react';

function Signup({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setMessage('Please enter a valid email!');
      return;
    }
    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters!');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    const response = await fetch('https://codesnip-2dmh.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.message === 'User registered successfully!') {
      setMessage('Account created! Please login.');
      setTimeout(() => onSwitchToLogin(), 2000);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <p>Join CodeSnip today!</p>
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
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '🙈'}
          </span>
        </div>
        <div className="password-container">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? '👁️' : '🙈'}
          </span>
        </div>
        <button onClick={handleSignup}>Create Account</button>
        {message && <p className="message">{message}</p>}
        <p>Already have an account? <span onClick={onSwitchToLogin}>Login</span></p>
      </div>
    </div>
  );
}

export default Signup;