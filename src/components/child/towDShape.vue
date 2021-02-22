<template>
  <div class="towdShape">
    <div class="title">2D 形状</div>
    <div class="tools">
      <div
        class="block"
        @click="updateBrush('圆')"
        :class="brush == '圆' ? 'active' : ''"
      >
        <svg
          t="1613826572414"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="25726"
          width="48"
          height="48"
        >
          <path
            d="M512 512m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
            fill="#9BA1B5"
            p-id="25727"
          ></path>
          <path
            d="M512 256v256l-181.12 181.12A256 256 0 1 0 512 256z"
            fill="#C0C5D3"
            p-id="25728"
          ></path>
          <path
            d="M512 928a416 416 0 1 1 416-416 416 416 0 0 1-416 416z m0-768a352 352 0 1 0 352 352A352 352 0 0 0 512 160z"
            fill="#9BA1B5"
            p-id="25729"
          ></path>
          <path
            d="M512 928a412.48 412.48 0 0 1-294.08-121.92l45.12-45.12A352 352 0 1 0 512 160V96a416 416 0 0 1 0 832z"
            fill="#C0C5D3"
            p-id="25730"
          ></path>
        </svg>
      </div>
      <div
        class="block"
        @click="updateBrush('线')"
        :class="brush == '线' ? 'active' : ''"
      >
        <svg
          t="1613826261164"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="19454"
          width="48"
          height="48"
        >
          <path
            d="M726.37 743.01m-72.42 0a72.42 72.42 0 1 0 144.84 0 72.42 72.42 0 1 0-144.84 0Z"
            fill="#1296db"
            p-id="19455"
          ></path>
          <path
            d="M556.11 530.11L398.92 363.54c28.72-38 26.17-92-8.43-126.61A96.82 96.82 0 1 0 358.68 395L519.1 565a25.44 25.44 0 0 0 37-34.92zM640.22 681.75a25.32 25.32 0 0 1-18.5-8L572.3 621.4a25.44 25.44 0 1 1 37-34.92l49.42 52.38a25.43 25.43 0 0 1-18.5 42.89z"
            fill="#1296db"
            p-id="19456"
          ></path>
        </svg>
      </div>
    </div>

    <div class="uploadImage">
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1/"
        :file-list="fileList"
        list-type="picture"
        :auto-upload="false"
        :on-change="onChangeImage"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation, Getter } from 'vuex-class'
@Component
export default class TowDShape extends Vue {
  private fileList = []

  @Mutation('updateBrush')
  private updateBrush!: string;

  @Getter('brush')
  private brush!: string;

  $store: any;

  onChangeImage (file: any) {
    const image = new Image()
    image.src = file.url
    image.onload = () => {
      this.$store.state.Image = image
    }
  }
}
</script>
<style lang="scss" scoped>
.towdShape {
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
  .tools {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    .block {
      width: 50px;
      height: 50px;
      border: 1px solid rgb(58, 131, 241);
      margin: 10px;
      &:hover {
        cursor: pointer;
      }
      &.active {
        background-image: linear-gradient(to left bottom, #a9bbe4, #03d4f0);
      }
    }
  }
  .uploadImage {
    border-top: 1px solid rgb(228, 228, 228);
    margin: 20px 0;
    padding: 20px 0;
    transform: scale(0.66);
    display: flex;
    justify-content: flex-start;
  }
}
</style>
