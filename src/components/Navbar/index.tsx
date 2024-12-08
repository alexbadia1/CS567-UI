import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_TITLE, LOGIN_PATH, SIGNUP_PATH } from '../../lib/constants';
import { AuthContext } from '../../contexts/AuthProvider';

import './index.scss';

export function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  const showNavbar = ![LOGIN_PATH, SIGNUP_PATH].includes(location.pathname);

  if (user && showNavbar) {
    return (
      <nav className="nav">
        <ul className="nav__actions--leading">
          <li className="nav__item">
            <Link to="/feed">News Feed</Link>
          </li>
        </ul>
        <div className="expand" />
        <span className="app-title">{APP_TITLE}</span>
        <div className="expand" />
        <ul className="nav__actions--trailing">
          <li className="nav__item">
            <Link to="/" onClick={() => logOut()}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
