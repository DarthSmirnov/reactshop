import Home from './pages/home';
import NotFound from './pages/NotFound';
import Cart from './pages/cart/index';
import Product from './pages/product/index';
import Category from './pages/category/index';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/category/:id(\\d+)',
    component: Category,
    exact: true,
  },
  {
    path: '/category/:category_id(\\d+)/product/:id(\\d+)',
    component: Product,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    component: NotFound,
  },
];

export default routes;
