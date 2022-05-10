import axios from 'axios'
import VueAxios from 'vue-axios'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(VueAxios, axios)
  app.config.globalProperties.$axios = axios
})
