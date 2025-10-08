module.exports = {
  presets: [
    [
      'next/babel',
      {
        // Target modern browsers to reduce polyfills
        'preset-env': {
          targets: {
            // Modern browsers that support ES2020+ features
            browsers: [
              'last 2 versions',
              '> 1%',
              'not dead',
              'not ie 11',
              'not op_mini all'
            ]
          },
          // Use modern JavaScript features without polyfills
          useBuiltIns: false,
          modules: false
        }
      }
    ]
  ],
  plugins: [
    // Add any additional plugins here
  ]
};
