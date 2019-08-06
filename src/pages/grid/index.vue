<template>
    <Row type="flex" :gutter="16">
        <Col class="col" :xs="24" :xl="6">
            <div class="grid">1</div>
        </Col>
        <Col class="col" :xs="24" :xl="6">
            <div class="grid">2</div>
        </Col>
        <Col class="col" :xs="24" :xl="6" :offset="6">
            <div class="grid">3</div>
        </Col>
        <Col class="col" :xs="24" :xl="6">
            <div class="grid">4</div>
        </Col>
        <Col class="col" :xs="24" :xl="6">
            <div class="grid">5</div>
        </Col>
    </Row>
</template>

<script>
  export default {

  }
</script>

<style scoped>
    .col {
        margin-bottom: 16px;
    }

    .grid {
        height: 100px;
        background-color: #2baee9;
    }
</style>
