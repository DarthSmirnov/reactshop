import {
  ADD_PRODUCT,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from '../constants/action-types';

const initialState = {
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') || '')
    : [],
};

function cartReducer(state = initialState, action) {
  let cart = state.cart;

  switch (action.type) {
    case REMOVE_FROM_CART: {
      cart.splice(action.payload, 1);

      if (cart.length === 0) localStorage.removeItem('cart');
      else localStorage.setItem('cart', JSON.stringify(cart));
      return { ...state, cart };
    }

    case CLEAR_CART: {
      localStorage.removeItem('basket');
      cart = [];
      return { ...state, cart };
    }

    case ADD_PRODUCT: {
      let { data, quantity } = action.payload;

      let record = state.cart.find((p) => p.product_id === data.product_id);
      if (!record) {
        let clearItem = (({ category_id, price, product_id, name }) => ({
          category_id,
          price,
          product_id,
          name,
        }))(data);
        Object.assign(clearItem, { quantity });
        cart.push(clearItem);
      } else {
        cart = state.cart.map((p) => {
          if (p.product_id === data.product_id) {
            p.quantity = p.quantity + quantity;
          }
          return p;
        });
      }
      let res = { ...state, cart };
      localStorage.setItem('cart', JSON.stringify(res.cart));
      return res;
    }

    default:
      return state;
  }
}

export default cartReducer;
