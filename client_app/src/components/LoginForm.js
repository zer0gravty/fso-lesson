import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (evt) => {
    evt.preventDefault();

    login({ username, password });
    setPassword('');
    setUsername('');
    navigate('../');
  };

  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant='primary' id='btn-login' type='submit'>Login</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
