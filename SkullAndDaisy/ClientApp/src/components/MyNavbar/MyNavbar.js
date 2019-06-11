import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClicky: PropTypes.func,
  }

  state = {
    isOpen: false,
    dropdownOpen: false
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  categoryToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { isAuthed, logoutClicky } = this.props;

    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/useraccount'>User Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/cart'>Cart</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='logout-link' onClick={logoutClicky}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className='ml-auto' navbar />;
    };

    return (
      <div className="my-navbar">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Skull & Daisy</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
          {/* Modal */}
          <div class="modal left fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
              <div class="modal-content">

                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Categories</h4>
                </div>

                <div class="modal-body">
                  
                </div>

              </div> {/*modal-content*/}
            </div> {/*modal-dialog*/}
          </div> {/*modal*/}
          <UncontrolledDropdown inNavbar>
                <DropdownToggle id="categoryDropdown" nav caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink tag={RRNavLink} to='/potions'>Potions</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink tag={RRNavLink} to='/poisons'>Poisons</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink tag={RRNavLink} to='/crystals'>Crystals</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink tag={RRNavLink} to='/herbs'>Herbs</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
