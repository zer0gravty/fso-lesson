import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (evt) => {
    evt.preventDefault();

    login({ username, password });
    setPassword('');
    setUsername('');
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
