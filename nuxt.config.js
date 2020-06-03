const { getUrlToResources } = require('library/src/assets/js/utils.js')
const { getHead } = require('library/src/assets/js/head.js')

module.exports = {
  mode: 'spa',
  head: getHead({
    title: 'Closing the emissions Gap',
    description: 'This module explores how current decarbonization plans until 2030 relate to the long-term targets of the Paris Agreement.',
    image: 'https://climatescenarios.org/share/og-emissions-gap.jpg'
  }),
  css: [
    'normalize-scss',
    '@/assets/style/base.scss'
  ],
  resolve: {
    alias: {
      style: 'assets/style'
    }
  },
  router: {
    base: '/emissions-gap/'
  },
  loading: { color: '#fff' },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ]
}
