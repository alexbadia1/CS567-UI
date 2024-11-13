import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export function Navbar() {
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
