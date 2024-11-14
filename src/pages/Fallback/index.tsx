import React from 'react';

export function Fallback() {
  return (
    <div>
      <div className="margin-24" />
      <div className="margin-24" />
      <div className="margin-24" />
      <p>The page you are looking for does not exist, try looking at:</p>
      <ul>
        <li>/signup</li>
        <li>/login</li>
        <li>/feed</li>
        <li>/articles/:id</li>
      </ul>
    </div>
  );
}
