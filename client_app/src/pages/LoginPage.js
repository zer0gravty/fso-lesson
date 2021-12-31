import React from 'react';
import Togglable from '../components/Togglable';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ user, handleLogin }) => (
  <div>
    {user === null && (
      <Togglable btnLabel={'Display Login Form'}>
        <LoginForm login={handleLogin} />
      </Togglable>
    )}
  </div>
);

export default LoginPage;
