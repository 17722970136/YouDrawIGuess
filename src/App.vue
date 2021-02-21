<template>
  <div id="app">
    <div id="nav">
      <div><router-link to="/" :class="routName=='canvas'? 'linkActiveClass' : ''">你画我猜</router-link> |</div>
      <div><router-link to="/drawingBed" :class="routName=='drawingBed'? 'linkActiveClass' : ''">图床</router-link></div>
    </div>
    <transition>
    <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
  @Component
export default class App extends Vue {
  get routName () {
    return this.$route.path.split('/')[1]
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.v-enter {
  opacity: 0;
  transition: translateX(200%);
  transform: scale(0);
  position: absolute;
}

.v-leave-to {
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all ease-out 0.5s;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  z-index: 3;
  width: 100%;
  display: flex;
  height: 50px;
  justify-content: center;
  align-content: center;
  background-image: linear-gradient(to right, #e0e0de,gray,#cdd6d5,gray,#d4d1da,gray,#e0e0de);
}
#nav div {
    line-height: 50px;
    color: white;
}
#nav a {
  font-weight: bold;
  color: rgb(253, 252, 252);
  margin: 0 20px;
}

#nav a.linkActiveClass {
  color: #8bebbf;
}
</style>
