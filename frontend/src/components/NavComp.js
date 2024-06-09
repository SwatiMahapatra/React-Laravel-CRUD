import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavComp = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://www.shutterstock.com/image-vector/hr-employee-retention-staff-icon-600w-2117845013.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Employee Managment System
          </Navbar.Brand>
          
          <Link className='btn btn-success mb-2 float-end' to='/forms'>Add New Employee</Link>
          
        </Container>
      </Navbar>
    </>
  )
}

export default NavComp