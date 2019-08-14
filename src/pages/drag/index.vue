<template>
    <div class="error">
        <div id="lucky"
             @mousedown="down" @touchstart="down"
             @mousemove="move" @touchmove="move"
             @mouseup="end" @touchend="end" @click="click"
        ></div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        flags: false,
        position: {x: 0, y: 0},
        nx: '',
        ny: '',
        dx: '',
        dy: '',
        xPum: '',
        yPum: '',
      }
    },
    methods: {
      // 实现移动端拖拽
      down() {
        var moveDiv = document.getElementById('lucky')
        this.flags = true;
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
      },
      move() {
        var moveDiv = document.getElementById('lucky')
        if (this.flags) {
          var touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          this.nx = touch.clientX - this.position.x;
          this.ny = touch.clientY - this.position.y;
          this.xPum = this.dx + this.nx;
          this.yPum = this.dy + this.ny;
          moveDiv.style.left = this.xPum + "px";
          moveDiv.style.top = this.yPum + "px";
          //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
          event.preventDefault();
        }
      },
      //鼠标释放时候的函数
      end() {
        this.flags = false;
        // 鼠标释放的时候从这里判断块是否被拖到窗口外变成负值，从而进行恢复
      },
      click() {
        console.log('click')
      }
    }
  }
</script>

<style scoped lang="less">
    .error {
        #lucky {
            width: 100px;
            height: 100px;
            background: red;
            position: fixed;
            top: 6rem;
            right: 0;
            z-index: 20070;
        }
    }
</style>
