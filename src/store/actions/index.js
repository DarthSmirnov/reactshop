import {
  ADD_PRODUCT,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from '../constants/action-types';

export function addProduct(payload) {
  return { type: ADD_PRODUCT, payload };
}
export function clearCart() {
  return { type: CLEAR_CART };
}
export function removeFromCart(payload) {
  return { type: REMOVE_FROM_CART, payload };
}
