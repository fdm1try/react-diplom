import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const navLinkClassName = ({ isActive }: {isActive: boolean}) => {
    let className = 'nav-link';
    if (isActive ) className += ' active';
    return className;
  }

  return (
    <ul className='navbar-nav mr-auto'>
      <li className='nav-item'>
        <NavLink className={navLinkClassName} to="/">Главная</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className={navLinkClassName} to="/catalog.html">Каталог</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className={navLinkClassName} to="/about.html">О магазине</NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className={navLinkClassName} to="/contacts.html">Контакты</NavLink>
      </li>
    </ul>
  )
}
