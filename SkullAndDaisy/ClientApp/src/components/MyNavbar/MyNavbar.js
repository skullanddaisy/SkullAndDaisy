import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import ReactModal from 'react-modal';
import menuIcon from '../../img/menuIcon-white.svg';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClicky: PropTypes.func,
  }

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const {isAuthed, logoutClicky } = this.props;

    return (
      <div className="my-navbar">
        <Navbar id="navbar">
          {/* <NavbarToggler onClick={e => this.toggle(e)}/> */}
          <img id="menuIcon" src={menuIcon} alt=""></img>
          <NavbarBrand id="brandLogo" href="/">Skull & Daisy</NavbarBrand>
          {/* <Collapse isOpen={this.state.isOpen} navbar> */}
            <Nav className="ml-auto" navbar>
              <NavItem className="nav-link">
              { isAuthed ? <NavLink className='logout-link' onClick={logoutClicky}>Logout</NavLink> : ''}
              </NavItem>
            </Nav>
          {/* </Collapse> */}
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;