import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_TITLE } from '../../lib/constants';

import './index.scss';

export function Navbar() {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  if (showNavbar) {
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
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
