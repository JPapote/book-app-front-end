import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavegationBar(){
        return(
            <Navbar bg="dark" variant="dark">
                <Link  to={""} className="navbar-brand">Home</Link>
                <Nav className="mr-auto">
                    <Link to={"addBooks"} className="nav-link">Add Books</Link> 
                    <Link to={"listBooks"} className="nav-link">List Books</Link>
                </Nav>
             </Navbar> 
        )
}