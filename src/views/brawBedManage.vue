<template>
  <div class="brawBedManage">

    <div class="btn">
      <el-button type="primary" @click="open">提交更改</el-button>
      <h3>图床后台,没账号 能进改你就改</h3>
    </div>

    <div class="logicLayout">
      <div class="content">
        <el-transfer
          v-model="value"
          :data="data"
          @left-check-change="checkedChange"
          @right-check-change="checkedChange"
          :titles="['不公开展示', '公开展示']"
        ></el-transfer>
      </div>
      <div class="demo-image__preview" ref="imagePreview">
        <el-image
          v-for="(item, index) in url"
          :key="index"
          :style="'transform:translateY('+index * 100 +'%)'"
          :src="item"
          :preview-src-list="srcList"
          :fit="'scale-down'"
          :lazy="true"
        >
        </el-image>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
@Component
export default class BrawBedManage extends Vue {
  data: any = [];
  value: any = [];
  private xhr: any;
  private requestInfo: any = [];
  private errNum = 0;

  @Getter('UPLOAD_URL')
  private UPLOAD_URL!: any;

  @Ref() private imagePreview: any;

  url = [
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  ];

  srcList = [
    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
  ];

  created () {
    this.xhr = new XMLHttpRequest()
    this.init()
  }

  checkedChange (data: any) {
    this.url = []
    this.srcList = []
    data.map((item: any) => {
      this.url.unshift(this.requestInfo.reqPath + this.requestInfo.res.pending[item])
      this.srcList.unshift(this.requestInfo.reqPath + this.requestInfo.res.pending[item])
    })
    this.imagePreview.lastChild.scrollIntoView(true)
  }

  open () {
    if (this.errNum >= 5) {
      return this.$message({
        type: 'error',
        message: '秘钥输错五次请稍后再试'
      })
    }
    this.$prompt('请输入秘钥', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      center: true,
      inputPattern: /\.@sll$/,
      inputErrorMessage: '秘钥格式不正确'
    }).then(({ value }: any) => {
      this.$message({
        type: 'success',
        message: '你的秘钥格式正确 ' + value + '准备提交更改'
      })
      this.updataDarwBedManageImageInfo(value)
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '取消输入'
      })
    })
  }

  updataDarwBedManageImageInfo (pwd: string) {
    const tempUpdata = this.value.map((item: any) => {
      return this.requestInfo.res.pending[item]
    })
    this.xhr.open('POST', this.UPLOAD_URL + '/updataDarwBedManageImageInfo')
    this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    this.xhr.send('passList=' + JSON.stringify(tempUpdata) + '&pwd=' + pwd)
    this.xhr.onload = () => {
      console.log(JSON.parse(this.xhr.responseText))
      if (JSON.parse(this.xhr.responseText).code === 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.errNum = 0
      } else {
        this.$message({
          type: 'error',
          message: '秘钥错误'
        })
        this.errNum += 1
      }
    }
    this.xhr.onerror = () => {
      console.log('err')
    }
  }

  init () {
    this.xhr.open('GET', this.UPLOAD_URL + '/getDarwBedManageImageInfo')
    this.xhr.send(null)
    this.xhr.onload = () => {
      this.requestInfo = JSON.parse(this.xhr.responseText)
      this.generateData()
    }
    this.xhr.onerror = () => {
      console.log('err')
    }
  }

  generateData () {
    // eslint-disable-next-line eqeqeq
    if (this.requestInfo.MsgCode != 'success') return
    this.data = this.requestInfo.res.pending.map((item: any, index: number) => {
      return { key: index, label: `${item} ____ ${index}` }
    })
    this.value = this.requestInfo.res.adope.map((item: any) => {
      // eslint-disable-next-line eqeqeq
      item = this.requestInfo.res.pending.findIndex((el: any) => el == item)
      if (item !== -1) return item
    })
  }
}
</script>

<style lang="scss">
.brawBedManage {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
  background-color: #e4e4e4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    color: rgb(35, 48, 90);
    margin-left: 5px;
  }
  .btn {
    width: 57%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 2px 0;
  }
  .logicLayout {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    .demo-image__preview {
      margin-left: 20px;
      width: 230px;
      height: 90vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      position: relative;
      .el-image {
        margin: 10px 0;
        width: 200px;
        position: absolute;
        img {
            height: 200px;
        }
      }
    }
    .content {
      width: 50%;
      min-width: 100px;
      display: flex;
      justify-content: center;
      .el-transfer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .el-transfer__buttons {
          margin: 10px 0;
        }
        .el-transfer-panel {
          width: 100%;
          .el-transfer-panel__body {
            margin-top: 10px;
            .el-checkbox-group.el-transfer-panel__list {
              .el-checkbox.el-transfer-panel__item {
                display: flex !important;
                justify-content: space-between;
                margin-right: 30px;
                &::-webkit-scrollbar {
                  width: 9px;
                  height: 9px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
