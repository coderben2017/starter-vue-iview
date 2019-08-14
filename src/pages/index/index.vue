<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img src="../../assets/images/logo.png" alt="logo">
                    </div>
<!--                    <div class="layout-nav">-->
<!--                        <MenuItem name="1">-->
<!--                            <Icon type="ios-navigate"></Icon>-->
<!--                            Item 1-->
<!--                        </MenuItem>-->
<!--                        <MenuItem name="2">-->
<!--                            <Icon type="ios-keypad"></Icon>-->
<!--                            Item 2-->
<!--                        </MenuItem>-->
<!--                        <MenuItem name="3">-->
<!--                            <Icon type="ios-analytics"></Icon>-->
<!--                            Item 3-->
<!--                        </MenuItem>-->
<!--                        <MenuItem name="4">-->
<!--                            <Icon type="ios-paper"></Icon>-->
<!--                            Item 4-->
<!--                        </MenuItem>-->
<!--                    </div>-->
                    <div class="operation">
                        <Icon type="md-log-out" color="#fff" size="26" title="退出登录" @click="handleLogout"/>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider :style="{background: '#fff', height: '92vh'}">
                    <Menu theme="light" width="auto">
                        <MenuGroup v-if="menu1.children" v-for="menu2 in menu1.children" :key="menu2.id" :title="menu2.text">
                            <div v-for="menu3 in menu2.children" :key="menu3.id">
                                <Submenu v-if="menu3.children" :name="menu3.id">
                                    <template slot="title">
                                        <Icon :custom="menu3.icon"></Icon> {{menu3.text}}
                                    </template>
                                    <div v-for="menu4 in menu3.children" :key="menu4.id">
                                        <Submenu v-if="menu4.children" :name="menu4.id">
                                            <template slot="title">
                                                <Icon :custom="menu4.icon"></Icon> {{menu4.text}}
                                            </template>
                                            <div v-for="menu5 in menu4.children" :key="menu5.id">
                                                <MenuItem :name="menu5.id" :to="menu5.url">
                                                    <Icon :custom="menu5.icon"></Icon> {{menu5.text}}
                                                </MenuItem>
                                            </div>
                                        </Submenu>
                                        <MenuItem v-else :name="menu4.id" :to="menu4.url">
                                            <Icon :custom="menu4.icon"></Icon> {{menu4.text}}
                                        </MenuItem>
                                    </div>
                                </Submenu>
                                <MenuItem v-else :name="menu3.id" :to="menu3.url">
                                    <Icon :custom="menu3.icon"></Icon> {{menu3.text}}
                                </MenuItem>
                            </div>
                        </MenuGroup>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '20px'}">
                    <Content :style="{padding: '20px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        menu1: []
      }
    },
    mounted() {
      const menus = JSON.parse(sessionStorage.getItem('menus'));
      if (menus.length && menus.length > 0) {
        this.menu1 = menus[0];
      }
    },
    methods: {
      handleLogout() {
        this.$Modal.confirm({
          title: '系统提示',
          content: '确定要退出登录吗？',
          onOk: () => {
            this.$router.replace(`/login?sc=${sessionStorage.getItem('schoolCode')}`);
          }
        })
      }
    }
  }
</script>

<style scoped>
    @import "./index.css";
</style>
