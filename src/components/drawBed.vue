<template>
  <div class="drawBed" ref="drawBedBody">
    <div class="imageMaxBox">
      <div
        class="imageBlock before"
        v-for="(item, index) in localStorage"
        :key="index"
        ref="imageBlock"
      >
        <img v-lazyLoad="item.url" src="../assets/lazyLoad.jpg" title="网友上传" :alt="item.url" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

Vue.directive('lazyLoad', {
  bind: (el: any, binding: any) => {
    const Io = new IntersectionObserver((entris) => {
      entris.map((item: any) => {
        if (item.intersectionRatio > 0) {
          item.target.src = binding.value
          Io.unobserve(item.target)
        }
      })
    })

    Io.observe(el)
  }
})
@Component
export default class DrawBed extends Vue {
  private localStorage: any = [];
  private starArr = 800;
  private splace = 800;
  private boxArr: any = [];
  private minInex = 0;
  private leNumber!: any;
  private boxWidth!: number;
  private boxHeight!: number;
  private minHeight!: number;
  private xhr: any;

  @Ref() private drawBedBody!: any;
  @Ref() private imageBlock: any;

  @Getter('UPLOAD_URL')
  private UPLOAD_URL!: any;

  created () {
    this.xhr = new XMLHttpRequest()
    this.requestInfo()
  }

  requestInfo () {
    this.xhr.open('GET', this.UPLOAD_URL + '/getDrawBedInfo')
    this.xhr.send(null)
    this.xhr.onload = () => {
      this.localStorage = JSON.parse(this.xhr.responseText).res.reverse()
    }
    this.xhr.onerror = () => {
      console.log('request:err')
      this.localStorage = localStorage.getItem('fileList') || '[]'
      this.localStorage = JSON.parse(this.localStorage)
    }
  }

  @Watch('localStorage')
  private hanlderLocalInfo () {
    this.$nextTick(() => {
      this.waerFall()
      this.bindingImage()
    })
  }

  mounted () {
    if (this.localStorage.length <= 0) return
    this.waerFall()
    this.bindingImage()
    addEventListener('resize', this.eventWindow)
    addEventListener('scroll', this.eventWindow)
  }

  bindingImage () {
    this.imageBlock.map((item: any) => {
      item.children[0].addEventListener('load', this.eventWindow)
    })
  }

  destroyed () {
    removeEventListener('resize', this.eventWindow)
    removeEventListener('scroll', this.eventWindow)
  }

  private timerOut: any;
  eventWindow () {
    clearTimeout(this.timerOut)
    this.timerOut = setTimeout(() => {
      this.waerFall()
      clearTimeout(this.timerOut)
    }, 500)
  }

  waerFall () {
    // 求出列数
    this.boxWidth = this.imageBlock[0].offsetWidth
    this.leNumber = this.drawBedBody.offsetWidth / this.boxWidth
    this.leNumber = parseInt(this.leNumber)
    // 定位的逻辑
    this.imageBlock.forEach((item: any, index: number) => {
      // 判断是否第一列 ,保存高度

      this.boxHeight = item.offsetHeight
      if (this.boxHeight <= 0) return false
      if (isNaN(this.boxHeight)) return false
      if (index < this.leNumber) {
        this.boxArr[index] = this.boxHeight
        item.classList.remove('before')
      } else {
        // 找最小高度
        // 找最小索引
        // eslint-disable-next-line eqeqeq
        this.minHeight = Math.min(...this.boxArr)
        this.minInex = this.boxArr.findIndex(

          // eslint-disable-next-line eqeqeq
          (item: any) => item == this.minHeight
        )
        item.style.cssText = `position:absolute;left:${this.minInex * this.boxWidth}px;top:${this.minHeight}px;`
        this.boxArr[this.minInex] += this.boxHeight
        item.classList.remove('before')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
* {
  transition: all linear 0.5s;
}
.drawBed {
  padding: 0;
  margin: 0;
  width: 100%;
  height: calc(100vw - 50);
  display: flex;
  justify-content: center;
  .imageMaxBox {
    position: relative;
    .imageBlock {
      float: left;
      padding: 15px;
      img {
        width: 250px;
      }
      &.before {
          width: 250px;
          height: 250px;
      }
    }
  }
}
</style>
