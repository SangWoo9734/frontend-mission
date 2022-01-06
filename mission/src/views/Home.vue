<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <div class="rotate">
      <input v-bind:value="word" v-on:input="changeWord"/>
      <button v-on:click="rotateWord">Run</button>
    </div>
    <p>{{word}}</p>
    <p v-if="word != ''">Rotate Times : {{count}}</p>
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
    changeWord(e) {
      this.word = e.target.value;
      this.count = this.word === '' ? 0 : this.count;
    },
    rotateWord() {
      this.word = this.word[this.word.length - 1] + this.word.slice(0, this.word.length - 1);
      this.count += 1;
    },
  },
};
</script>

<style>
.rotate input {
  margin-right : 10px;
}
.rotate button {
  padding : 3px, 5px;
}
</style>
