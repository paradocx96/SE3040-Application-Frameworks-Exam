import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">AF - 2021</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/add-category">Add Category</Nav.Link>
                            <Nav.Link as={Link} to="/category">Category-List</Nav.Link>
                            <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
                            <Nav.Link as={Link} to="/product">Product-List</Nav.Link>
                            <Nav.Link as={Link} to="/calculate">Calculator</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
