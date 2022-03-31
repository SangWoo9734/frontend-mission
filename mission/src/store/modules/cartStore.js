const cartStore = {
  namespaced: true,
  state: {
    cartItem: [],
  },
  mutations: {
    MU_ADD_ITEM_IN_CART: (state, item) => {
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
    MU_REMOVE_ITEM_FROM_CART: (state, id) => {
      const filter = state.cartItem.find(
        (cartItem) => cartItem.product_no === id,
      );
      const itemIndex = state.cartItem.indexOf(filter);
      state.cartItem.splice(itemIndex, 1);
    },
    MU_ADD_QUANTITY: (state, id) => {
      const filter = state.cartItem.find(
        (cartItem) => cartItem.product_no === id,
      );
      const itemIndex = state.cartItem.indexOf(filter);
      state.cartItem[itemIndex].quantity += 1;
    },
    MU_SUB_QUANTITY: (state, id) => {
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
  actions: {
    AC_ADD_ITEM_IN_CART: ({ commit }, item) => {
      commit('MU_ADD_ITEM_IN_CART', item);
    },
    AC_REMOVE_ITEM_FROM_CART: ({ commit }, id) => {
      commit('MU_REMOVE_ITEM_FROM_CART', id);
    },
    AC_ADD_QUANTITY: ({ commit }, id) => {
      commit('MU_ADD_QUANTITY', id);
    },
    AC_SUB_QUANTITY: ({ commit }, id) => {
      commit('MU_SUB_QUANTITY', id);
    },
  },
  getters: {
    GE_CART_ITEM: (state) => state.cartItem,
    GE_CART_LEN: (state) => state.cartItem.length,
  },
};

export default cartStore;
