module.exports = {
  mode: 'spa',
  head: {
    title: 'Senses Project – Closing the emissions Gap',
    htmlAttrs: {
      lang: 'en-GB'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  // env: {
  //   dataURL: './'
  // },
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
