import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './index.scss';

export function Navbar() {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  if (showNavbar) {
    return (
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/feed">News Feed</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
