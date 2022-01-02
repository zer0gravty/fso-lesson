import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = ({ user }) => (
  <Navbar collapseOnSelect expand='lg' variant='dark'>
    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    <Navbar.Collapse id='responsive-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link href='#' as='span'>
          <Link to='/'>Home</Link>
        </Nav.Link>
        <Nav.Link href='#' as='span'>
          <Link to='/notes'>Notes</Link>
        </Nav.Link>
        <Nav.Link href='#' as='span'>
          <Link to='/login'>User</Link>
        </Nav.Link>
        <Nav.Link href='#' as='span'>
          {user
            ? <h4>{user.username} is logged in.</h4>
            : <Link to='/login'>Login</Link>
          }
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
