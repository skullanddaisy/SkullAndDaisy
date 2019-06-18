import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import ProductRequest from '../../helpers/data/productRequests';
import SearchField from 'react-search-field';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClicky: PropTypes.func,
  }

  state = {
    isOpen: false,
    dropdownOpen: false,
    searchFilter: [],
  };

  componentDidMount() {
    ProductRequest.getAllProducts()
			.then((products) => {
				this.setState({ searchFilter: products })
			})
  }

  onChange = (value, e) => {
		const { searchFilter } = this.state;
		const searchResults = [];
		e.preventDefault();
		if (!value) {
		  this.setState({ searchFilter: searchResults });
		} else {
		  searchFilter.forEach((result) => {
			if (result.title.toLowerCase().includes(value.toLowerCase())
			  || result.description.toLowerCase().includes(value.toLowerCase())
			) {
			  searchFilter.push(result);
			}
			this.setState({ searchFilter });
		  });
		}
	  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  categoryToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const { isAuthed, logoutClicky } = this.props;

    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className="ml-auto" navbar>
            <SearchField
              placeholder="Search Sweaters..."
              onChange={this.onChange}
              searchText=""
              classNames="test-class w-50 mt-auto"
            />
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
        <Navbar className="the-navbar" dark expand="md">
          <NavbarBrand href="/">Skull & Daisy</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
          {/* Modal */}
          <div className="modal left fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">

                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title" id="myModalLabel">Categories</h4>
                </div>

                <div className="modal-body">

                </div>

              </div> {/* modal-content */}
            </div> {/* modal-dialog */}
          </div> {/* modal */}
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
