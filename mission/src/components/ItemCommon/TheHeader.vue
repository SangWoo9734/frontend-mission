<template>
    <div id='header' :class='showHeader ? "flex" :  "header-none flex" ' data-test='header'>
      <h2>🦁 LionAbly</h2>
    </div>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      showHeader: true,
    };
  },
  methods: {
    scroll() {
      let debouncer;
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition < 0) {
        return;
      }

      if (debouncer) {
        clearTimeout(debouncer);
      }

      debouncer = setTimeout(() => {
        if (currentScrollPosition < 60) this.showHeader = true;
        else this.showHeader = false;
      }, 100);
    },
  },
  mounted() {
    // window.scrollTo(0, 0);
    document.addEventListener('scroll', this.scroll);
  },

  unmounted() {
    document.removeEventListener('scroll', this.scroll);
  },
};
</script>

<style scoped>
#header {
  position: fixed;
  top: 0;
  max-width:500px;
  width: 100%;
  height: 60px;
  border-bottom: 0.5px solid lightgray;
  box-shadow: 0px 2px 3px 0px lightgray;
  background: white;
  align-items: center;
  z-index: 10;
  transition: 0.4s all ease-out;
}
#header h2{
  width: 100%;
  text-align: left;
  margin-left : 15px;
}

.header-none {
  box-shadow: none;
  transform: translate(0, -100%);
}
</style>
