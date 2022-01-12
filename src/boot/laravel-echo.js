import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

const echo = new Echo({
  broadcaster: 'pusher',
  encrypted: false,
  key: 'coronachess',
  wsHost: window.location.hostname,
  wsPort: 443,
  disableStats: true
})

export default ({ Vue }) => {
  Vue.use(echo);
  Vue.prototype.$echo = echo;
}
