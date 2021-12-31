import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ user }) => {
  const navStyle = {
    display: 'flex',
    gap: '1rem',
  };

  return (
    <nav style={navStyle}>
      <Link to='/'>Home</Link>
      <Link to='/notes'>Notes</Link>
      <Link to='/users'>User</Link>
      {user
        ? <h4>{user.username} is logged in.</h4>
        : <Link to='/login'>Login</Link>
      }
    </nav>
  );
};

export default NavigationBar;
