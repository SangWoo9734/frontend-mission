<template>
  <div id='mypage'>
    <div class='sub-navbar flex'>
      <h2 class='sub-navbar-title' data-test='user-title'>👦🏻 My Page</h2>
    </div>
    <div class='mypage-user-conatiner flex'>
      <div class='mypage-img-container'>
        <img :src='defaultImage' alt='user-image' class='mypage-user-img' data-test='user-image'>
      </div>
      <div class='mypage-user-info'>
        <h2 class='mypage-info-detail' data-test='user-name'>{{ user.username }} 님</h2>
        <p class='mypage-info-detail' data-test='user-nick'>
          <font-awesome-icon icon='user-alt' /> ID: {{ user.id }}
        </p>
        <p class='mypage-useremail' data-test='user-email'>
          <font-awesome-icon icon='envelope' /> E-mail: {{ user.email }}
        </p>
      </div>
    </div>
    <div class='mypage-tool-container' data-test='tools'>
      <p class='mypage-tool'><font-awesome-icon icon='credit-card' /> 결제수단 관리</p>
      <p class='mypage-tool'><font-awesome-icon icon='sign-out-alt' /> 로그아웃</p>
      <p class='mypage-tool'><font-awesome-icon icon='cog' /> 설정</p>
    </div>
    <div></div>
  </div>
</template>

<script>
import Repository from '../repositories/RepositoryFactory';

const ItemRepository = Repository.get('items');

export default {
  name: 'MyPage',
  data() {
    return {
      user: {},
      defaultImage: 'https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1608/tuktukdesign160800043/61010830-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg?ver=6',
    };
  },
  methods: {
    async getWishInfo() {
      const result = await ItemRepository.getInfo();
      return result.data;
    },
  },
  created() {
    this.getWishInfo()
      .then((result) => {
        this.user = result;
      });
  },
};
</script>

<style scoped>
#mypage {
  padding-top: 60px;
  margin-bottom: 70px;
  height: calc(100vh - 130px);
}
.mypage-user-conatiner {
  justify-content: center;
  align-items: center;
  margin: 0 20px 20px 20px;
  overflow: hidden;
  border-bottom: 1px solid lightgray;
}
.sub-navbar {
  margin-bottom: 10px;
}
.mypage-img-container {
  width: 30%;
  border-radius: 30px;
}
.mypage-user-img {
  width: 100%;
}
.mypage-user-info {
  margin: 10px;
  padding-left: 10px;
  width: 70%;
  text-align: left;
}
.mypage-info-detail  {
  margin-top: 0;
  margin-bottom: 10px;
}
.mypage-tool-container {
  text-align: left;
  padding: 0 20px;
}
.mypage-tool {
  padding: 0 10px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
}
.mypage-tool svg {
  margin-right: 10px;
}
.mypage-tool:hover {
  cursor: pointer;
}
</style>
