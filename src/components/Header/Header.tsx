import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigation } from './Navigation';
import { SearchForm } from './SearchForm';
import { CartControls } from './CartControls';
import { NavLink } from 'react-router-dom';


export const Header = () => {
  const [searchFormVisible, setSearchFormVisible] = useState<boolean>(false);

  const handleSearchIconClick = () => {
    setSearchFormVisible((state) => !state);
  } 

  return (
    <header className='container'>
      <Row>
        <Col>
          <nav className='navbar navbar-expand-sm navbar-light bg-light'>
              <NavLink className='navbar-brand' to='/'>
                <img src='./img/header-logo.png' alt='Bosa Noga' />
              </NavLink>
            <div className='collapase navbar-collapse' id='navbarMain'>
              <Navigation />
            </div>
            <div>
              <div className='header-controls-pics'>
                <div onClick={handleSearchIconClick} data-id='search-expander' className='header-controls-pic header-controls-search'></div>
                <CartControls />
              </div>
              <SearchForm visible={searchFormVisible}/>
            </div>
          </nav>
        </Col>
      </Row>
    </header>
  )
}
