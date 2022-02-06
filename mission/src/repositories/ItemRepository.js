import Client from './clients/AxiosClient';

export default {
  getItems() {
    return Client.get('/item');
  },
  getItemInfo(id) {
    return Client.get(`/item/${id}`);
  },
  getCart() {
    return Client.get('/cart');
  },
  getWish() {
    return Client.get('/wish');
  },
  getInfo() {
    return Client.get('/info');
  },
};
