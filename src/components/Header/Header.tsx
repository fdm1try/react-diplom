import logoImage from '../../assets/img/header-logo.png';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigation } from './Navigation';
import { CartControls } from './CartControls';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';


export const Header = () => {
  const [searchFormVisible, setSearchFormVisible] = useState<boolean>(false);
  const [searchFormValue, setSearchFormValue] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const searchFormClassName = () => {
    let className = 'header-controls-search-form form-inline';
    if (!searchFormVisible) className += ' invisible';
    return className;
  }

  const handleSearchIconClick = () => {
    const fromOtherPage = location.pathname !== '/catalog';
    if (!fromOtherPage) {
      setSearchFormVisible(false);
      setSearchFormValue('');
    }
    if (searchFormValue) {
      navigate('/catalog', { state: {searchQuery: searchFormValue, fromOtherPage}})
    } else {
      setSearchFormVisible((state) => !state);
    }
  }

  const handleSearchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchIconClick();
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setSearchFormValue(e.target.value);
  }

  return (
    <header className='container'>
      <Row>
        <Col>
          <nav className='navbar navbar-expand-sm navbar-light bg-light'>
              <NavLink className='navbar-brand' to='/'>
                <img src={logoImage} alt='Bosa Noga' />
              </NavLink>
            <div className='collapase navbar-collapse' id='navbarMain'>
              <Navigation />
            </div>
            <div>
              <div className='header-controls-pics'>
                <div onClick={handleSearchIconClick} data-id='search-expander' className='header-controls-pic header-controls-search'></div>
                <CartControls />
              </div>
              <form onSubmit={handleSearchFormSubmit} data-id='search-form' className={searchFormClassName()}>
                <input onChange={handleSearchInputChange} className='form-control' placeholder='Поиск' value={searchFormValue} />
              </form>
            </div>
          </nav>
        </Col>
      </Row>
    </header>
  )
}
