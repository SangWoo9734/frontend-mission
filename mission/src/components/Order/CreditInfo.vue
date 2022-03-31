<template>
  <div id='creditInfo' class='container'>
    <div class='order-navbar flex'>
      <h4 class='order-navbar-title' data-test='order-title'>결제수단 선택</h4>
    </div>
    <div>
      <div class='order-pay' data-test='easy-pay'>
        <input type='radio' id='easy-pay' name='pay' value='easy-pay' @click='payState = 1' checked>
        <label for='easy-pay'>간편 결제</label>
      </div>
      <div v-if='payState === 1' class='order-pay-content' data-test='easy-pay-content'>
        <div class='order-card'>
          <img :src="cardImage" alt="card-image" data-test='easy-pay-image'>
          <div data-test='easy-pay-cardInfo'>
            <font-awesome-icon icon="credit-card" /> {{ cardNum }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class='order-pay' data-test='normal-pay'>
        <input type='radio' id='normal-pay' name='pay' value='normal-pay' @click='payState = 2'>
        <label for='normal-pay'>일반 결제</label>
      </div>
      <div v-if='payState === 2' class='order-pay-content' data-test='normal-pay-content'>
        <div class='order-normal-pay'>
          <div :class='selectNormalPayMethods(menu)' v-for='menu in orderNormalMenu' :key='menu'
            @click='normalPayMethods = menu' data-test='normal-pay-menu'>
            {{ menu }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditInfo',
  data() {
    return {
      payState: 1,
      cardImage: 'https://www.mastercard.us/content/dam/public/mastercardcom/na/us/en/consumers/find-a-card/other/card-image-standard-credit-card.png',
      cardNum: '8090-32XX-XXXX-XXXX',
      orderNormalMenu: ['신용카드', '무통장입금', '계좌이체', '휴대폰 결제'],
      normalPayMethods: '',
    };
  },
  methods: {
    selectNormalPayMethods(menu) {
      return this.normalPayMethods === menu ? 'order-normal-pay-menu menu-selected' : 'order-normal-pay-menu';
    },
  },
};
</script>

<style scoped>
#creditInfo {
  margin-bottom: 40px;
}
.order-pay {
  margin: 0 15px;
  height: 40px;
  display: flex;
  align-items: center;

}
input[type='radio'],
input[type='radio']:checked {
  appearance: none;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  margin-right: 0.1rem;
}

input[type='radio'] {
  margin: 0 10px;
  background-color: white;
  border: 2px solid lightgray;
}

input[type='radio']:checked {
  margin: 0 10px;
  background-color: rgb(255, 209, 123);
}

.order-pay-content {
  width: 90%;
  margin: auto;
  padding: 20px 0;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
}
.order-card img {
  width: 100%;
}
.order-card div {
  font-weight: bold;
  font-size: 15px;
}
.order-normal-pay {
  width: 95%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.order-normal-pay-menu {
  margin: 5px;
  padding: 5px 10px;
  background: rgb(170, 170, 170);
  border-radius: 5px;;
  color: white;
}
.menu-selected {
  background: rgb(255, 209, 123);
}
</style>
