import chessboard from 'components/chessboard/ChessBoard.vue'
import { boot } from 'quasar/wrappers'

// Install the components
// export function install (Vue) {
//   Vue.component('chessboard', chessboard)
//   /* -- Add more components here -- */
// }

// Expose the components
export {
  chessboard
  /* -- Add more components here -- */
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: '1.0'
  // install,
}

export default boot(({ app }) => {
  app.use(chessboard)
})

// export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
