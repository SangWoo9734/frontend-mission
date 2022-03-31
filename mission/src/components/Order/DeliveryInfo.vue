<template>
  <div id='deliveryInfo' class='container'>
    <div class='order-navbar flex'>
      <h4 class='order-navbar-title' data-test='order-title'>배송 확인</h4>
    </div>
    <div class='order-delivery-row flex'>
      <div  class='bold' data-test='delivery-user'>수령인</div>
      <input class='order-input delivery-user' type="text" data-test='delivery-user-input'>
    </div>
    <div class='order-delivery-row flex'>
      <div  class='bold' data-test='delivery-call'>전화번호</div>
      <input class='order-input delivery-call'
        type='text' placeholder='"-"없이 숫자만 입력' data-test='delivery-call-input'>
    </div>
    <div class='order-delivery-row'>
      <div class='order-delivery-address flex'>
        <div class='bold' data-test='delivery-address'>배송지</div>
        <div class='delivery-address flex'>
          <input class='order-input' type="text" data-test='delivery-address-input'>
          <button data-test='delivery-address-btn'>주소 찾기</button>
        </div>
      </div>
      <div class='delivery-address-detail flex'>
        <input class='order-input' type="text"
          data-test='delivery-address-detail'>
      </div>
    </div>
    <div class='order-delivery-row order-delivery-message-container'>
      <div class='order-delivery-message flex'>
        <div class='bold' data-test='delivery-message'>요청사항</div>
        <select class='order-select' @change='selectUserInput($event.target.value)'
          data-test='delivery-message-select'>
            <option value="default">------------------------선택------------------------</option>
            <option value="front-door">부재시 문 앞에 두시면 됩니다.</option>
            <option value="front-desk">경비실에 맡겨주세요.</option>
            <option value="user-input">직접입력</option>
        </select>
      </div>
      <div class='delivery-message-userInput flex'>
        <input v-if='userInput' class='order-input'
          type="text" placeholder='요청사항 입력' data-test='delivery-message-input'>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeliveryInfo',
  data() {
    return {
      userInput: false,
    };
  },
  methods: {
    selectUserInput(select) {
      console.log(select);
      if (select === 'user-input') {
        this.userInput = true;
      } else {
        this.userInput = false;
      }
    },
  },
};
</script>

<style scoped>
#deliveryInfo {
  margin-bottom: 20px;
}
.order-delivery-row {
  margin: 0 25px 10px 25px;
  justify-content: space-between;
  align-items: center;
}
.bold {
  font-weight: bold;
}
.order-delivery-address {
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
}
.order-delivery-message-container {
  height: 80px;
}
.order-delivery-message {
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
}
.order-input {
  height: 20px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px 10px;
}
.order-select {
  width: 70%;
  height: 32px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px 10px;
}
.delivery-address-detail, .delivery-message-userInput {
  justify-content: right;
  align-items: center;
}
.delivery-address {
  width: 70%;
}
.delivery-address input{
  width: 70%;
}
.delivery-address button{
  width: calc(30% - 10px);
  margin-left: 10px;
  border: 0;
  border-radius: 5px;
  padding: 3px 5px;
  background: black;
  color: white;
}
.delivery-address-detail input,
.delivery-message-userInput input,
.delivery-user,
.delivery-call {
  width: 65%;
}
</style>
