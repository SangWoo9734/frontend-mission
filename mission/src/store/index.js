import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItem: [],
  },
  mutations: {
    addItemInCart(state, item) {
      const cartLength = state.cartItem.filter(
        (cartItem) => cartItem.product_no === item.product_no,
      ).length;

      if (state.cartItem === [] || cartLength === 0) {
        state.cartItem.push(Object.assign(item, {
          quantity: 1,
        }));
      } else {
        const filter = state.cartItem.filter((cartItem) => cartItem.product_no === item.product_no);
        filter[0].quantity += 1;
      }
    },
    removeItemFromCart(state, id) {
      const filter = state.cartItem.find(
        (cartItem) => cartItem.product_no === id,
      );
      const itemIndex = state.cartItem.indexOf(filter);
      state.cartItem.splice(itemIndex, 1);
    },
    addQuantity(state, id) {
      const filter = state.cartItem.find(
        (cartItem) => cartItem.product_no === id,
      );
      const itemIndex = state.cartItem.indexOf(filter);
      state.cartItem[itemIndex].quantity += 1;
    },
    subQuantity(state, id) {
      const filter = state.cartItem.find(
        (cartItem) => cartItem.product_no === id,
      );
      const itemIndex = state.cartItem.indexOf(filter);

      if (state.cartItem[itemIndex].quantity === 1) {
        // eslint-disable-next-line no-alert
        alert('더이상 수량을 줄일 수 없습니다.');
      } else {
        state.cartItem[itemIndex].quantity -= 1;
      }
    },
  },
  getters: {
    getCartItems(state) {
      return state.cartItem;
    },
    getCartItemLength(state) {
      return state.cartItem.length;
    },
  },
});
