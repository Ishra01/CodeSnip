function Navbar({ onLoginClick }) {
  return (
    <nav>
      <h2>CodeSnip</h2>
      <ul>
        <li>Home</li>
        <li>My Snippets</li>
        <li onClick={onLoginClick}>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;