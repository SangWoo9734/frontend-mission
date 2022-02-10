import Client from './clients/AxiosClient';

export default {
  getItems() {
    return Client.get('/item');
  },
  getItemInfo(id) {
    return Client.get(`/item/${id}`);
  },
};
