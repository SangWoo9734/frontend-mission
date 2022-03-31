import { createRouter, createWebHistory } from 'vue-router';
import ItemListPage from '@/views/ItemList.vue';
import ItemInfo from '@/views/ItemInfo.vue';
import Cart from '@/views/Cart.vue';
import Wish from '@/views/Wish.vue';
import MyPage from '@/views/MyPage.vue';
import Order from '@/views/Order.vue';

const routes = [
  {
    path: '/item',
    name: 'item',
    component: ItemListPage,
    props: true,
  },
  {
    path: '/item/:id',
    name: 'ItemInfo',
    component: ItemInfo,
    props: true,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    props: true,
  },
  {
    path: '/wish',
    name: 'wish',
    component: Wish,
    props: true,
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPage,
    props: true,
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
