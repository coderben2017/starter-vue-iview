<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                </div>
            </Card>
        </div>
        <Modal v-model="positionModal" :footer-hide="true">
            <Row>
                <Col span="6" v-for="(position, index) in positions" :key="index">
                    <Button type="primary" @click="getMenuByPositionId(position.positionId, position.userId)">
                        {{position.positionName}}
                    </Button>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
  import LoginForm from './form';

  export default {
    components: {
      LoginForm
    },
    data() {
      return {
        positionModal: false,
        positions: []
      }
    },
    mounted() {
      sessionStorage.setItem('schoolCode', window.location.href.split('=')[1]);
    },
    methods: {
      handleSubmit: function({username, password}) {
        const schoolCode = sessionStorage.getItem('schoolCode');
        if (!schoolCode || schoolCode === 'undefined') {
          this.$Message.warning('未检测到schoolCode，请检查地址栏');
          return;
        }

        this.$http.post(this.commonUrl + '/api/user/v1/login', this.$qs.stringify({
          username: username,
          password: password,
          schoolCode: schoolCode
        })).then(({data}) => {
          const {jwt, user, globalparameter, treeviewPositionDtoList} = data.commonInfo;

          sessionStorage.setItem('token', jwt);
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('casUser', user.loginName);
          sessionStorage.setItem('schoolCode', user.schoolCode);
          sessionStorage.setItem('globalInfo', JSON.stringify(globalparameter)); // 提取全局参数

          for (let i = 0; i < treeviewPositionDtoList.length; i++) { // 提取部门id和名称
            if (treeviewPositionDtoList[i].tvType === 's-d') {
              sessionStorage.setItem('departmentId', JSON.stringify(positions[i].treeviewId));
              sessionStorage.setItem('departmentName', JSON.stringify(positions[i].itemName));
              break;
            }
          }

          const newPositions = [];
          for (let i = 0; i < treeviewPositionDtoList.length; i++) {
            if (treeviewPositionDtoList[i].positionId) {
              newPositions.push(treeviewPositionDtoList[i]); // 提取含有positionId的职务
            }
          }

          // 存在一个职务
          if (newPositions.length === 1) {
            this.getMenuByPositionId(newPositions[0].positionId, user.userId);
          }
          // 存在多个职务
          else if (newPositions.length > 1) {
            // 有2个职务且含有1个默认职务时，不使用默认职务
            let needSelectPosition = true;
            if (newPositions.length === 2) {
              if (!newPositions[0].itemName) {
                this.getMenuByPositionId(newPositions[1].positionId, user.userId);
                needSelectPosition = false;
              } else if (!newPositions[1].itemName) {
                this.getMenuByPositionId(newPositions[0].positionId, user.userId);
                needSelectPosition = false;
              }
            }
            if (needSelectPosition) {
              this.positions = newPositions;
              this.positionModal = true;
            }
          }
          // 无职务
          else {
            this.$Message.warning('当前账户无职务，请配置后再登录');
          }
        });
      },
      getMenuByPositionId: function(positionId, userId) {
        sessionStorage.setItem('positionId', positionId);
        this.$http.get(this.commonUrl + '/api/menu/v1/getMenuListByUserId?' + this.$qs.stringify({
          positionId: positionId,
          userId: userId,
          projectName: 'data-center'
        }), this.getHeader()).then(({data}) => {
          sessionStorage.setItem('menus', JSON.stringify(data));
          this.$router.replace('/index/home');
        })
      }
    }
  }
</script>

<style scoped lang="less">
    @import "./login";
</style>
