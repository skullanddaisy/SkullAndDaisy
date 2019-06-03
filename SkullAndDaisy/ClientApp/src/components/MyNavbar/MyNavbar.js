import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <div className="mynavbar">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Skull & Daisy</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;