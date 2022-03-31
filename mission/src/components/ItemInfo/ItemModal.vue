<template>
  <div id="itemModal">
    <div class='background'>
      <div class='modal-container'>
        <div class='modal-title bold' data-test='modal-title'>안내</div>
        <div class='modal-content flex' data-test='modal-content'>
          <div v-if='isAlreadyInCart' data-test='modal-text'>장바구니에 담았습니다.</div>
          <div v-else data-test='modal-text'>이미 장바구니에 있습니다.<br>수량이 변경되었습니다.</div>
        </div>
        <div class='modal-btn-box flex'>
          <router-link class='modal-btn' to='/cart' @click='modalToggle' data-test='move'>
            장바구니 이동
          </router-link>
          <div class='modal-btn' @click='modalToggle' data-test='close'>확인</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CouponModal',
  props: {
    isAlreadyInCart: { type: Boolean, default: false },
  },
  methods: {
    modalToggle() {
      this.$emit('modalToggle');
    },
  },
};
</script>

<style scoped>
#itemModal {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100vh;
  background: rgba(0, 0, 0, 0.288);
  z-index: 10;
}
.modal-container {
  max-width: 300px;
  width: 70%;
  height: 20%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
}
.modal-title {
  padding: 5px 10px;
  font-size: 20px;
  border-bottom: 1px solid black;
}
.modal-content {
  width: 100%;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
}
.modal-btn-box {
  border-top: 1px solid lightgray;
  padding: 5px 0;
  font-size: 15px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.modal-btn {
  width: 50%;
  padding: 3px;
  font-size: 14px;
  text-decoration: none;
  color: black;
}
.modal-btn:hover {
  cursor: pointer;
}
</style>
