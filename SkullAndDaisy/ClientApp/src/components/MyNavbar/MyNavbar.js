/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import SearchField from 'react-search-field';
import {
  Button,
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
import ProductRequest from '../../helpers/data/productRequests';
import userRequests from '../../helpers/data/userRequests';
import SearchTable from '../SearchTable/SearchTable';
import SearchTableSellers from '../SearchTableSellers/SearchTableSellers';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool,
    logoutClicky: PropTypes.func,
  }

  state = {
    isOpen: false,
    dropdownOpen: false,
    products: [],
    filteredProducts: [],
    sellers: [],
    filteredSellers: [],
    nonSellers: [],
    searchStatus: 'products',
  };

getAllProducts = () => {
  ProductRequest.getAllProducts()
    .then((products) => {
      this.setState({ products });
    });
}

getAllSellers = () => {
  userRequests.getAllUsers()
    .then((users) => {
      const mySellers = users.filter(x => x.products.length >= 1);
      const nonSellers = users.filter(x => x.products.length === 0);
      this.setState({ sellers: mySellers });
      this.setState({ nonSellers });
    });
}

componentDidMount() {
  this.getAllProducts();
  this.getAllSellers();
}

  onChange = (value, e) => {
    const { products } = this.state;
    const filteredProducts = [];
    e.preventDefault();
    if (!value) {
      this.setState({ filteredProducts: [] });
    } else {
		  products.forEach((result) => {
        if (result.title.toLowerCase().includes(value.toLowerCase())
			  || result.description.toLowerCase().includes(value.toLowerCase())
        ) {
			  filteredProducts.push(result);
        }
        this.setState({ filteredProducts });
		  });
    }
  }

  onChangeSellers = (value, e) => {
    const { sellers } = this.state;
    const filteredSellers = [];
    e.preventDefault();
    if (!value) {
      this.setState({ filteredSellers: [] });
    } else {
      sellers.forEach((result) => {
        if (result.firstName.toLowerCase().includes(value.toLowerCase())
        || result.lastName.toLowerCase().includes(value.toLowerCase())
        || result.username.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredSellers.push(result);
        }
        this.setState({ filteredSellers });
      });
    }
  }

  onEnter = (value, e) => {
    const { products } = this.state;
    const filteredProducts = [];
    e.preventDefault();
    if (!value) {
      this.setState({ filteredProducts: products });
    } else {
		  products.forEach((result) => {
        if (result.title.toLowerCase().includes(value.toLowerCase())
			  || result.description.toLowerCase().includes(value.toLowerCase())
        ) {
			  filteredProducts.push(result);
        }
        this.setState({ filteredProducts });
		  });
    }
  }

  onEnterSellers = (value, e) => {
    const { sellers } = this.state;
    const filteredSellers = [];
    e.preventDefault();
    if (!value) {
      this.setState({ filteredSellers: sellers });
    } else {
      sellers.forEach((result) => {
        if (result.firstName.toLowerCase().includes(value.toLowerCase())
        || result.lastName.toLowerCase().includes(value.toLowerCase())
        || result.username.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredSellers.push(result);
        }
        this.setState({ filteredSellers });
      });
    }
  }

  onSearchClick = (value, e) => {
    const { products } = this.state;
    const filteredProducts = [];
    e.preventDefault();
    if (!value) {
      this.setState({ filteredProducts: products });
    } else {
		  products.forEach((result) => {
        if (result.title.toLowerCase().includes(value.toLowerCase())
			  || result.description.toLowerCase().includes(value.toLowerCase())
        ) {
			  filteredProducts.push(result);
        }
        this.setState({ filteredProducts });
		  });
    }
  }

  onSearchClickSellers = (value, e) => {
    const { sellers } = this.state;
    const filteredSellers = [];
    e.preventDefault();
    if (!value) {
      this.setState({ filteredSellers: sellers });
    } else {
      sellers.forEach((result) => {
        if (result.firstName.toLowerCase().includes(value.toLowerCase())
        || result.lastName.toLowerCase().includes(value.toLowerCase())
        || result.username.toLowerCase().includes(value.toLowerCase())
        ) {
          filteredSellers.push(result);
        }
        this.setState({ filteredSellers });
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

    const buildSearchResults = () => {
      const { filteredProducts } = this.state;
      if (filteredProducts.length > 0) {
        return (
          <div id="searchResults">
            <div className='searchResultsCard'>
              <SearchTable products={filteredProducts}/>
            </div>
          </div>
        );
      }
      return <div></div>;
    };

    const buildSearchResultsSellers = () => {
      const { filteredSellers } = this.state;
      if (filteredSellers.length > 0) {
        return (
          <div id="searchResults">
            <div className='searchResultsCard'>
              <SearchTableSellers sellers={filteredSellers} />
            </div>
          </div>
        );
      }
      return <div></div>;
    };

    const productsMode = (e) => {
      e.preventDefault();
      this.setState({ searchStatus: 'products' });
    };

    const sellersMode = (e) => {
      e.preventDefault();
      this.setState({ searchStatus: 'sellers' });
    };

    const buildFilterButton = () => {
      if (this.state.searchStatus === 'products') {
        return (
          <Button color="primary" onClick={sellersMode}>Products</Button>
        );
      } if (this.state.searchStatus === 'sellers') {
        return (
          <Button color="warning" onClick={productsMode}>Sellers</Button>
        );
      }
      return '';
    };

    const buildNavbar = () => {
      const { searchStatus } = this.state;
      if (isAuthed && searchStatus === 'products') {
        return (
          <Nav className="ml-auto" navbar>
            {buildFilterButton()}
            <SearchField
              placeholder="Search Skull and Daisy..."
              onChange={this.onChange}
              onEnter={this.onEnter}
              onSearchClick={this.onSearchClick}
              searchText=""
              classNames="searchBar"
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
      } if (isAuthed && searchStatus === 'sellers') {
        return (
          <Nav className="ml-auto" navbar>
            {buildFilterButton()}
            <SearchField
              placeholder="Search Skull and Daisy..."
              onChange={this.onChangeSellers}
              onEnter={this.onEnterSellers}
              onSearchClick={this.onSearchClickSellers}
              searchText=""
              classNames="searchBar"
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
        {buildSearchResults()}
        {buildSearchResultsSellers()}
      </div>
    );
  }
}

export default MyNavbar;
