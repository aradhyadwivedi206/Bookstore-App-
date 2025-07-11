import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const NavBar=()=>{
    return(
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="/book/List">
               Add Listing
                </Nav.Link>

                 <Nav.Link href="/book/orders">
               your Orders
                </Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
    )
}

export default NavBar;