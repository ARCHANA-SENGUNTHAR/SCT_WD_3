import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import profileIcon from '../assets/profile.png';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">Javenture</div>

      <ul className="nav-links">
        <li><Link to="/">🏠 Home</Link></li>
        {user && <li><Link to="/dashboard">📊 My Dashboard</Link></li>}

        {!user ? (
          <>
            <li><Link to="/login">👤 Login as User</Link></li>
            <li><Link to="/admin/login">🛠️ Login as Admin</Link></li>
          </>
        ) : (
          <li
            className="profile-container"
            onClick={() => setShowDropdown(prev => !prev)}
            ref={dropdownRef}
          >
            <div className="profile-info">
              <img src={profileIcon} alt="profile" className="profile-icon" />
              <span className="username">
               {user?.isAdmin ? `Admin ${user.username}` : user?.username}
             </span>
            </div>

            {showDropdown && (
              <div className="dropdown">
                <Link to={user?.isAdmin ? '/admin/profile' : '/profile'} onClick={() => setShowDropdown(false)}>
                  👤 View Profile
                </Link>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
