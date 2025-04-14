
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import "./Header.css";
 




const Header = () => {

  

    return (


        <Navbar collapseOnSelect expand="lg"  style={{ width: '100%', backgroundColor:"#b4ff43d2",marginBottom:"20px",}} >

        <Container  >
          <Navbar.Brand  as={Link} to="/"  style={{color:"rgba(74, 73, 73,0.749", fontWeight:"bold"}}>Pronadji Trenera</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link  as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/trainers">Treneri</Nav.Link>
              <Nav.Link  as={Link} to="/favorites">Moji Favoriti</Nav.Link>
              
               </Nav>

               <Nav>
              <Nav.Link  as={Link} to="/register">Signup</Nav.Link>
             
            </Nav>
            <Nav>
              <Nav.Link  as={Link} to="/login">Login</Nav.Link>
             
            </Nav>

            <Nav>
              <Nav.Link  as={Link} to="/appointments">Zakaži termin</Nav.Link>
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  

export default Header;
