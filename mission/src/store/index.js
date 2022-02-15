import { createStore } from 'vuex';

// Modules
import cartStore from './modules/cartStore';

export default createStore({
  modules: {
    cart: cartStore,
  },
});
