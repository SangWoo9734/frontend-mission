import Client from './clients/AxiosClient';

export default {
  getInfo() {
    return Client.get('/info');
  },
};
