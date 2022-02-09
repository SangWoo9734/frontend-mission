import Client from './clients/AxiosClient';

export default {
  getWish() {
    return Client.get('/wish');
  },
};
