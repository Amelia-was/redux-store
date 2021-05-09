import React from "react";
import { Link } from "react-router-dom";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux';

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  //const [state, dispatch] = useStoreContext();

  const state = useSelector((state) => state);
  const { cart } = state;
  const dispatch = useDispatch();

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    };
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <div className='img-container'>

        <img
          alt={name}
          src={`/images/${image}`}
          />
        <p className='hover-detail w-100'>See Details</p>
        </div>
      </Link>
      <p>{name} | {quantity} left</p>
      
      <div>
        <span>${price}</span>
      </div>
      <button className='w-100' onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
