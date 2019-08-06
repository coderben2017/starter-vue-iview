<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h1>
                    <img src="../../assets/images/logo.png">
                </h1>
                <h2>
                    <p>Welcome to your iView app!</p>
                    <Button @click="handleStart">Start iView</Button>
                </h2>
            </Col>
        </Row>
    </div>
</template>

<script>
  export default {
    methods: {
      handleStart() {
        this.$router.replace('/user?id=abc');
      }
    }
  }
</script>

<style scoped lang="less">
    @import "style.less";
</style>
