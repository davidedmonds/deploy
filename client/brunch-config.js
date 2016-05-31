module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!app)/,
        'js/app.js': /^app/
      }
    },
    stylesheets: {
      joinTo: 'css/app.css',
      order: {
        before: '**/muicss.min.css'
      }
    }
  },

  plugins: {
    babel: {presets: ['es2015', 'react']}
  }
};
