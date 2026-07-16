function Login() {
  return (
    <div className="auth-container">
      <h2>Welcome Back!</h2>
      <p>Login to your CodeSnip account</p>
      <div className="auth-form">
        <input
          type="email"
          placeholder="Enter your email"
        />
        <input
          type="password"
          placeholder="Enter your password"
        />
        <button>Login</button>
        <p>Don't have an account? <span>Sign Up</span></p>
      </div>
    </div>
  );
}

export default Login;