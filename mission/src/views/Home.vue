<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <div>
      <input id='word_input' v-bind:value="word" v-on:input="changeWord" data-word/>
      <button id='word_rotate' v-on:click="rotateWord">제출</button>
      <button id='word_notice' v-on:click="showAlert">알림</button>
    </div>
    <p class='result'>{{word}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      word: '',
      count: 0,
    };
  },
  methods: {
    showAlert() {
      /* eslint-disable */
      alert(this.word === '' ? 'Enter Word' : `${this.word} ${this.count}`);
      /* eslint-enable */
    },
    changeWord(e) {
      this.word = e.target.value;
      this.count = 0;
    },
    rotateWord() {
      if (this.word === '') {
        this.showAlert();
        return;
      }
      this.word = this.word[this.word.length - 1] + this.word.slice(0, this.word.length - 1);
      this.count += 1;
    },
  },
};
</script>

<style>
.rotate button {
  padding : 3px, 5px;
  margin-left : 10px;
}
</style>
