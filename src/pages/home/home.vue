<template>
    <div class="container">
        <div class="title">快捷菜单</div>
        <Row :gutter="20">
            <Col :xs="24" :lg="4" v-for="menu in thirdLevelMenus" :key="menu.id">
                <div class="box overflow-ellipsis" :title="menu.text" @click="handleNavigator(menu)">
                    <Icon :custom="menu.icon"></Icon> {{menu.text}}
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        thirdLevelMenus: [] // 无子菜单的三级菜单
      }
    },
    mounted() {
      this.getThirdLevelMenus();
    },
    methods: {
      getThirdLevelMenus: function() {
        const menus = JSON.parse(sessionStorage.getItem('menus'));
        // 提取二级菜单
        const secondLevelMenus = [];
        for (let i = 0; i < menus.length; i++) {
          if (menus[i].children) {
            for (let j = 0; j < menus[i].children.length; j++) {
              if (menus[i].children[j].children) { // 有孩子的
                secondLevelMenus.push(menus[i].children[j])
              }
            }
          }
        }
        // 提取三级菜单
        const thirdLevelMenus = [];
        for (let i = 0; i < secondLevelMenus.length; i++) {
          for (let j = 0; j < secondLevelMenus[i].children.length; j++) {
            if (!secondLevelMenus[i].children[j].children) { // 无孩子的
              thirdLevelMenus.push(secondLevelMenus[i].children[j]);
            }
          }
        }
        this.thirdLevelMenus = thirdLevelMenus
      },
      handleNavigator: function (menu) {
        this.$router.push(menu.url);
        this.$store.commit('setActiveMenuId', menu.id);
      }
    }
  }
</script>

<style scoped>
    .box {
        height: 50px;
        margin: 10px 0;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        border: 1px solid #ccc;
        cursor: pointer;
    }

    .title {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        border-left: 2px solid #19be6b;
        padding-left: 10px;
        margin-bottom: 10px;
    }
</style>
