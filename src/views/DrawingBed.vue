<template>
  <div class="about">
    <h1>你好啊 欢迎来到你的图床！</h1>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class DrawingBed extends Vue {
  get routerMeta () {
    return this.$route.meta
  }
}
</script>
