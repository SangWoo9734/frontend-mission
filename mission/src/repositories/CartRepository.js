import Client from './clients/AxiosClient';

export default {
  getCart() {
    return Client.get('/cart');
  },
};
