import CartReopository from './CartRepository';
import ItemRepository from './ItemRepository';
import UserRepository from './UserRepository';
import WishRepository from './WishRepository';

const repositories = {
  item: ItemRepository,
  wish: WishRepository,
  cart: CartReopository,
  user: UserRepository,
};

export default {
  get: (name) => repositories[name],
};
