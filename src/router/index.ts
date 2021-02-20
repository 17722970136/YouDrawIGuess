import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: [
      {
        name: 'Home',
        path: '/Home'
      }
    ],
    children: [
      {
        path: '/',
        redirect: '/canvas/paintBrush'
      },
      {
        path: '/canvas/paintBrush',
        name: 'paintBrush',
        meta: [
          {
            color: 'white'
          },
          {
            color: 'LightGray'
          },
          {
            color: 'DimGrey'
          },
          {
            color: 'black'
          },
          {
            color: 'Firebrick'
          },
          {
            color: 'red'
          },
          {
            color: 'goldenrod'
          },
          {
            color: 'gold'
          },
          {
            color: 'Yellow'
          },
          {
            color: 'green'
          },
          {
            color: 'LawnGreen'
          },
          {
            color: 'LimeGreen'
          },
          {
            color: 'Cyan'
          },
          {
            color: 'DeepSkyBlue'
          },
          {
            color: 'DodgerBlue'
          },
          {
            color: 'MediumSlateBlue'
          },
          {
            color: 'lavender'
          },
          {
            color: 'SaddleBrown'
          },
          {
            color: 'blue'
          },
          {
            color: 'Coral'
          }
        ],
        component: () => import('../components/child/paintBrush.vue')
      },
      {
        path: '/canvas/2dShape',
        name: '2dShape',
        meta: [],
        component: () => import('../components/child/towDShape.vue')
      },
      {
        path: '/canvas/drawingBorad',
        name: 'drawingBorad',
        component: () => import('../components/child/drawingBorad.vue')
      }
    ]
  },
  {
    path: '/drawingBed',
    name: 'drawingBed',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: [
      { name: '你好 图床' }
    ],
    component: () => import(/* webpackChunkName: "about" */ '../views/DrawingBed.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

export default router
