function Navbar({ onLoginClick, onHomeClick, onSignupClick, onAddClick, isLoggedIn, snippetCount }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  return (
    <nav>
      <h2 onClick={onHomeClick} style={{ cursor: 'pointer' }}>CodeSnip</h2>
      <ul>
        <li className="nav-home" onClick={() => {
        console.log('Home clicked!');
        onHomeClick();
        }}>Home
        </li>
        {isLoggedIn && <li onClick={onAddClick}>+ Add Snippet</li>}
        {!isLoggedIn && <li onClick={onSignupClick}>Sign Up</li>}
        {!isLoggedIn && <li onClick={onLoginClick}>Login</li>}
        {isLoggedIn && (
          <li className="profile-menu">
            <div className="profile-avatar">
              {localStorage.getItem('userEmail')?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="profile-dropdown">
              <p>📧 {localStorage.getItem('userEmail')}</p>
              <p>📝 {snippetCount} Snippets saved</p>
              <hr />
              <p onClick={handleLogout} className="logout-btn">🚪 Logout</p>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;