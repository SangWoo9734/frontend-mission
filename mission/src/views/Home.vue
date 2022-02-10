<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <div class='word-container'>
      <input v-bind:value="word" v-on:input="changeWord" data-test='user-input'/>
      <button id='word-rotate' v-on:click="rotateWord" data-test='rotate-word'>제출</button>
      <button id='word-notice' v-on:click="changeCount" data-test='notice-count'>알림</button>
    </div>
    <p class='result' data-test='user-input-window'>{{word}}</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      word: '',
      count: 0,
    };
  },
  methods: {
    showAlert() {
      if (this.word === '') {
        // eslint-disable-next-line no-alert
        alert('Enter Word');
      } else {
        // eslint-disable-next-line no-alert
        alert(`${this.word} ${this.count}`);
      }
    },
    changeWord(e) {
      this.word = e.target.value;
      this.count = 0;
    },
    changeCount() {
      this.count += 1;
      this.showAlert();
    },
    rotateWord() {
      if (this.word === '') {
        this.showAlert();
        return;
      }
      this.word = this.word.slice(1, this.word.length) + this.word[0];
    },
  },
};
</script>

<style scoped>
.word-container {
  display : flex;
  flex-direction : row;
  justify-content : center;
  align-items : center;
}
#word-input {
  height : 14px;
  padding : 4px;
}
#word-rotate, #word-notice {
  padding : 2px 5px;
  margin-left : 10px;
}
</style>
