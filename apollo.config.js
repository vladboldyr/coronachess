/* eslint-env node */
// See https://www.apollographql.com/docs/devtools/apollo-config/
module.exports = {
  client: {
    service: {
      name: 'my-service',
      url: 'https://ccq.l.cidious.com/graphql' // 'http://localhost:3000/graphql',
    },
    // необязательно отключаем проверку проверки SSL
    skipSSLValidation: true,
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts']
  }
}
