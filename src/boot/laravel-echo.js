import Echo from 'laravel-echo'
import { boot } from 'quasar/wrappers'

window.Pusher = require('pusher-js')

const echo = new Echo({
  broadcaster: 'pusher',
  encrypted: false,
  key: 'coronachess',
  wsHost: window.location.hostname,
  wsPort: 443,
  disableStats: true
})

export default boot(({ app }) => {
  app.use(echo)
  app.config.devtools = true
  app.config.globalProperties.$echo = echo
})
