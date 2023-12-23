import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store"

export const CartControls = () => {
  const itemsCount = useAppSelector(state => state.cart.items.length);

  const navigate = useNavigate();

  const handleClick = () => navigate('/cart.html');

  return (    
    <div onClick={handleClick} className='header-controls-pic header-controls-cart'>
      {itemsCount > 0 && (
        <div className='header-controls-cart-full'>{itemsCount}</div>
      )}
      <div className='header-controls-cart-menu'></div>
    </div>    
  )
}
