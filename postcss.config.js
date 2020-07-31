module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './posts/*.md',
          './components/**/*.tsx',
          './pages/**/*.tsx',
        ],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
      }
    ]
  ]
}
