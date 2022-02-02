<template>
  <div class='sort-btn-container flex' data-test='sort-btn'>
    <div class='sort-btn-viewbox flex'>
      <div class='sort-btn' id='sort-fixed-btn'>
      <font-awesome-icon :icon="['fas', 'filter']" />
      정렬
      </div>
      <div class='sort-btn' v-for='(point, i) in sortPoints' :key='point'
        @click='setSortPoint(point)'  :data-test='`btn-${i}`'>
        # {{ point }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemSort',
  emit: ['sortItem'],
  data() {
    return {
      sortPoints: ['최신순', '높은 할인율', '높은 평점순', '낮은 가격순', '높은 가격순', '리뷰 많은순'],
    };
  },
  methods: {
    setSortPoint(point) {
      this.$emit('sortItem', point);
    },
  },
};
</script>

<style scoped>
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
