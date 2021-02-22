<template>
  <div class="drawingBed">
    <canvas ref="canvas" class="canvas" width="200" height="200" @dblclick="manage">
      你的浏览器不支持canvas，请升级浏览器或者使用Chrome/fixfor</canvas
    >
    <div class="startAll" ref="startll">
      <div
        v-for="(item, index) in starArr"
        :key="index"
        class="starts"
        ref="starts"
      ></div>
    </div>

    <div class="updataImage">
      <el-upload
        ref="elUpload"
        class="upload-demo"
        :drag="true"
        :action="UPLOAD_URL + '/uploadDrawBed'"
        :multiple="true"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-preview="onPreview"
        :on-remove="onRemove"
        list-type="picture"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过2M<br/>
          注意：合格图片将公开展示，介意请莫上传
        </div>
        <div class="el-upload__tip" slot="tip">
          <svg t="1613997337172" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3705" width="48" height="48"><path d="M45.3 559.8v-95.4L0.1 466.9v90.4z" fill="#ffffff" p-id="3706"></path><path d="M180.9 567.4V456.9l-90.4 5v100.4z" fill="#ffffff" p-id="3707"></path><path d="M1024.1 512.1L768.4 240.9v183.3l-542.3 30.2v115.5L768.4 600v183.3z" fill="#ffffff" p-id="3708"></path></svg>
          <router-link to="/drawBed">更多</router-link>
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import '../style/components/drawingBed.scss'
@Component
export default class DrawingBed extends Vue {
  private starArr = 800;
  private splace = 800;
  private ctx: any;
  private gradient: any;
  private fileList: any = [];
  @Ref() private starts!: any;
  @Ref() private elUpload!: any;
  @Ref() private canvas!: any;

  @Getter('UPLOAD_URL')
  private UPLOAD_URL!: string;

  mounted () {
    this.init()
    this.initCanvas()
  }

  manage () {
    this.$router.push({ name: 'brawBedManage' })
  }

  initCanvas () {
    this.ctx = this.canvas.getContext('2d')
    this.ctx.beginPath()
    this.gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0)
    this.ctx.clearRect(0, 0, 200, 200)
    this.gradient.addColorStop(0, 'magenta')
    this.gradient.addColorStop(0.57, 'blue')
    this.gradient.addColorStop(0.99, 'pink')
    this.ctx.font = '40px Microsoft YaHei'
    this.ctx.fillStyle = this.gradient
    this.ctx.fillText('你好 图床', 10, 90)
    this.ctx.restore()
  }

  beforeUpload (file: any) {
    // 格式规范
    const isJPG = file.type === 'image/jpeg' || 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG/png 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    if (!isJPG || !isLt2M) {
      return false
    }
  }

  onPreview (file: any) {
    this.copyText(file.response.url)
  }

  copyText (data: any) {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', data)
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, 9999)
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    }
    document.body.removeChild(input)
  }

  onRemove (file: any, fileList: any) {
    localStorage.setItem('fileList', JSON.stringify(fileList))
  }

  uploadSuccess (response: any, file: any, fileList: any) {
    this.fileList = fileList.map((item: any) => {
      return {
        ...item,
        url: item.response.url
      }
    })
    localStorage.setItem('fileList', JSON.stringify(this.fileList))
    this.elUpload.$children[2].$el.lastChild.scrollIntoView(false)

    this.$message({
      message: '上传成功',
      type: 'success'
    })
  }

  init () {
    this.starts.forEach((item: any) => {
      const speed = 0.2 + Math.random() * 1
      const thisDDistance = this.splace + Math.random() * 300
      item.style.transformOrigin = `0 0 ${thisDDistance}px`
      item.style.transform = `translate3d(0,0,-${thisDDistance}px) rotateY(${
        Math.random() * 360
      }deg) rotateX(${Math.random() * -50}deg) scale(${speed},${speed})`
    })
    const fileList_ = localStorage.getItem('fileList') || '[]'
    this.fileList = JSON.parse(fileList_)
    this.fileList = this.fileList.reverse()
  }
}
</script>
