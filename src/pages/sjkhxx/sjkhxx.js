import Vue from 'vue'
import App from './sjkhxx.vue'
import { Uploader, Area, RadioGroup, Radio, Popup, Cell, CellGroup } from 'vant'
import 'vant/lib/index.css'

Vue.use(Area)
Vue.use(Uploader)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Popup)
Vue.use(Cell).use(CellGroup)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
