import ItemRepository from './ItemRepository';

const repositories = {
  items: ItemRepository,
};

export default {
  get: (name) => repositories[name],
};
