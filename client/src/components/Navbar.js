function Navbar({ onLoginClick, onHomeClick, onSignupClick, onAddClick }) {
  return (
    <nav>
      <h2 onClick={onHomeClick} style={{ cursor: 'pointer' }}>CodeSnip</h2>
      <ul>
        <li onClick={onHomeClick}>Home</li>
        <li onClick={onAddClick}>+ Add Snippet</li>
        <li onClick={onSignupClick}>Sign Up</li>
        <li onClick={onLoginClick}>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;