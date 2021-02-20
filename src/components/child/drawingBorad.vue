<template>
  <div class="drawingBorad">
    <div class="title">画布</div>
    <div class="switchGroup">
      <div class="isShow switch">
        <div class="hint">显示画布</div>
        <el-switch v-model="isShow" active-text="开" inactive-text="关">
        </el-switch>
      </div>
      <div class="isOpacity switch">
        <div class="hint">透明画布</div>
        <el-switch v-model="isOpacity" active-text="开" inactive-text="关">
        </el-switch>
      </div>
    </div>
    <div class="drawBoradSize">
      <div class="title">调整画布大小</div>
      <div class="SizeInfo">
        <div class="width size">
          <div class="note">宽度</div>
          <div class="input"><input type="text" /><div>像素</div></div>
        </div>
        <div class="height size">
          <div class="note">高度</div>
          <div class="input"><input type="text" /><div>像素</div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class DrawBorad extends Vue {
  private isShow = true;
  private isOpacity = false;
}
</script>
<style lang="scss" scoped>
.drawingBorad {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 80%;
    height: 50px;
    font-size: 1.5vw;
    color: rgb(0, 121, 219);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .switchGroup {
    display: flex;
    flex-direction: column;
    width: 80%;
    border-bottom: 1px solid rgb(204, 204, 204);
    padding-bottom: 20px;
    .hint {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      font-size: 0.9vw;
      color: rgb(19, 18, 18);
      margin: 10px 0;
    }
    .switch {
      margin-bottom: 15px;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .drawBoradSize {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      font-size: 0.5vw;
    }
    .SizeInfo {
      display: flex;
      width: 100%;
      .size {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: flex-start;
        .input {
            display: flex;
            border: 1px solid rgb(56, 131, 243);
            height: 28px;
            width: 80%;
            justify-content: center;
            align-items: center;
            font-size: 0.7vw;
            flex-wrap: wrap;
            div {
                line-height: 20px;
            }
            input {
                border: 0;
                outline: none;
                text-align: right;
                width: 20px;
                color: rgb(24, 23, 23);
                font-size: 0.8vw;
            }
        }
        .note {
          margin-bottom: 10px;
          font-size: 0.9vw;
        }
      }
    }
  }
}
</style>
