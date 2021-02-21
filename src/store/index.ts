import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    lineWidth: 5,
    noOpacityValue: 100,
    canvasSizeSlider: 100,
    canvasWpx: 750,
    canvasHpx: 400,
    currentWpx: 0,
    currentHpx: 0,
    isShowCnavas: true,
    isOpacity: false,
    strokeStyle: 'red',
    brush: '记号笔',
    Image: null,
    WSURL: 'wss://192.168.124.7:8082',
    UPLOAD_URL: 'http://127.0.0.1:996'
  },
  getters: {
    lineWidth: state => state.lineWidth,
    noOpacityValue: state => state.noOpacityValue,
    canvasSizeSlider: state => state.canvasSizeSlider,
    canvasWpx: state => state.canvasWpx,
    canvasHpx: state => state.canvasHpx,
    currentWpx: state => state.currentWpx,
    currentHpx: state => state.currentHpx,
    isShowCnavas: state => state.isShowCnavas,
    isOpacity: state => state.isOpacity,
    strokeStyle: state => state.strokeStyle,
    brush: state => state.brush,
    Image: state => state.Image,
    WSURL: state => state.WSURL,
    UPLOAD_URL: state => state.UPLOAD_URL

  },
  mutations: {
    updataCanvasPx (state, data: any) {
      state.currentWpx = data.Wpx
      state.currentHpx = data.Hpx
    },
    updateStroke (state, data) {
      state.strokeStyle = data
    },
    updateBrush (state, data: string) {
      state.brush = data
    }
  },
  actions: {},
  modules: {}
})
