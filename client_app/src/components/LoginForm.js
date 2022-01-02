import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Form, Button } from 'react-bootstrap';
import { TextField, Button } from '@material-ui/core';

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (evt) => {
    evt.preventDefault();

    const loggedIn = await login({ username, password });
    if (loggedIn) {
      setPassword('');
      setUsername('');
      navigate('../');
    }
  };

  // Material UI
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <TextField
          id='username'
          type='text'
          label='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          id='password'
          type='password'
          label='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          id='btn-login'
          type='submit'
        >
          Login
        </Button>
      </form>
    </div>
  );

  // react-bootstrap
  // return (
  //   <div>
  //     <h2>Login</h2>

  //     <Form onSubmit={handleLogin}>
  //       <Form.Group>
  //         <Form.Label>username</Form.Label>
  //         <Form.Control
  //           id='username'
  //           type='text'
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)} />
  //         <Form.Label>password</Form.Label>
  //         <Form.Control
  //           id='password'
  //           type='password'
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //         <Button variant='primary' id='btn-login' type='submit'>Login</Button>
  //       </Form.Group>
  //     </Form>
  //   </div>
  // );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
