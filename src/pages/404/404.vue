<template>
    <div class="container-404">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h1 style="font-family: STKaiti">页面未找到，请检查地址栏路径</h1>
                <br>
                <div>
                    <Button type="primary" shape="circle" icon="md-arrow-round-back" @click="goBack">返回上一页</Button>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="less">
    .container-404 {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;

        .ivu-row-flex {
            height: 100%;
        }
    }
</style>
