<template>
  <div id='item-list-page' class='container'>
    <!-- Header -->
    <TheHeader />
    <!-- SortButton -->
    <ItemSort @sortItem='sortItem' />
    <!-- ItemList -->
    <div class='item-list' data-test='item-list'>
      <Item v-for='item in itemData' :key='item.id'
        :imgUrl= 'item.imgUrl'
        :title= 'item.title'
        :shortDescription= 'item.shortDescription'
        :cost= 'item.cost'
        :isDiscount= 'item.discount.isDiscount'
        :discountRate= 'item.discount.rate'
        :discountedCost= 'item.discountedCost'
        :reviewLength= 'item.reviewLength'
        :averageRate= 'item.averageRate'
        :isNew= 'item.isNew'
        data-test='item' />
    </div>
    <!-- Navbar -->
    <TheNavbar />
  </div>
</template>

<script>
import TheHeader from '../components/ItemCommon/TheHeader.vue';
import ItemSort from '../components/ItemList/ItemSort.vue';
import Item from '../components/ItemList/Item.vue';
import TheNavbar from '../components/ItemList/TheNavbar.vue';

export default {
  name: 'ItemListPage',
  data() {
    return {
      itemData: [
        {
          id: 1102321,
          imgUrl: 'https://image.msscdn.net/images/goods_img/20190923/1163605/1163605_2_500.jpg',
          title: 'NIKE F/W Sweater',
          shortDescription: 'This is description',
          cost: 30000,
          discount: { isDiscount: true, rate: 15 },
          userRate: [4.8, 4.3, 4.1, 4.5, 4.7],
          uploadDate: '2022-01-01',
        },
        {
          id: 1102323,
          imgUrl: 'https://www.socks-house.com/shopimages/soxhousem/0340060000183.jpg',
          title: 'School 스포츠 긴 양말 (Green)',
          shortDescription: 'This is description',
          cost: 12000,
          discount: { isDiscount: true, rate: 10 },
          userRate: [4.4, 4.2, 3.7],
          uploadDate: '2022-01-02',
        },
        {
          id: 1102325,
          imgUrl: 'https://media.catchfashion.com/images/h_l?id=4ZmBUsDVn&t=ps',
          title: 'B-Street Athlete Runner',
          shortDescription: 'This is description',
          cost: 89000,
          discount: { isDiscount: false, rate: 0 },
          userRate: [4.6, 4.5],
          uploadDate: '2022-01-15',
        },
        {
          id: 1102327,
          imgUrl: '',
          title: '무지 기모 후드 (BEIGE)',
          shortDescription: 'This is description',
          cost: 42000,
          discount: { isDiscount: true, rate: 20 },
          userRate: [4.5, 4.2, 4.0, 3.9],
          uploadData: '2022-01-11',
        },
        {
          id: 1102329,
          imgUrl: 'https://static.mlb-korea.com/images/goods/detail/m/20201123/32CP77111-50L-22150463920731175.jpg/dims/resize/828x828',
          title: 'MLB 뉴욕양키스 (BLACK)',
          shortDescription: 'This is description',
          cost: 39000,
          discount: { isDiscount: true, rate: 10 },
          userRate: [],
          uploadDate: '2022-01-21',
        },
      ],
    };
  },
  components: {
    TheHeader,
    ItemSort,
    Item,
    TheNavbar,
  },
  methods: {
    sortAscending(point) {
      this.itemData.sort((a, b) => {
        if (a[point] > b[point]) return 1;
        if (a[point] === b[point]) return 0;
        if (a[point] < b[point]) return -1;
        return 0;
      });
    },
    sortDesending(point) {
      this.itemData.sort((a, b) => {
        if (a[point] < b[point]) return 1;
        if (a[point] === b[point]) return 0;
        if (a[point] > b[point]) return -1;
        return 0;
      });
    },

    sortItem(point) {
      if (point === '최신순') this.sortDesending('id');
      if (point === '높은 할인율') {
        this.itemData.sort((a, b) => {
          if (a.discount.rate < b.discount.rate) return 1;
          if (a.discount.rate === b.discount.rate) return 0;
          if (a.discount.rate > b.discount.rate) return -1;
          return 0;
        });
      }
      if (point === '높은 평점순') this.sortDesending('averageRate');
      if (point === '낮은 가격순') this.sortAscending('discountedCost');
      if (point === '높은 가격순') this.sortDesending('discountedCost');
      if (point === '리뷰 많은순') this.sortDesending('reviewLength');
    },
  },
  created() {
    this.itemData.forEach((data) => {
      const userReviewLength = data.userRate.length;
      let rateSum = 0;
      data.userRate.forEach((r) => {
        rateSum += r;
      });

      this.data = Object.assign(data, {
        discountedCost: data.cost * (1 - data.discount.rate / 100),
        reviewLength: userReviewLength,
        averageRate: userReviewLength !== 0 ? (rateSum / userReviewLength).toFixed(2) : '0.00',
        isNew: (Date.now() - new Date(data.uploadDate).getTime()) / (1000 * 3600 * 24) < 7,
      });
    });
  },
};
</script>

<style scoped>
#item-list-page{
  padding-top: 60px;
}
.item-list {
  padding : 10px 7px 100px 7px;
  display: grid;
  grid-template-columns: 50% 50%;
}
.sort-btn-container{
  width: 100%;
  height: 50px;
  margin-top: 20px;
  overflow: auto;
  align-items: center;
}
.sort-btn-viewbox {
  width: fit-content;
  align-items: center;
  padding: 0 10px;
}
#sort-fixed-btn{
  border: 1px solid gray;
  background: white;
  width: 60px;
}
.sort-btn {
  padding: 5px 10px;
  margin-right: 10px;
  width: max-content;
  float: left;
  border-radius: 25px;
  border: 2px solid rgb(255, 209, 123);
}
.sort-btn:hover{
  cursor: pointer;
}

</style>
