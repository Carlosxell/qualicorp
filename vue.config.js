const fs = require('fs');

module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Qualicorp - Teste';
      return args;
    });
  },
  devServer: {
    https: {
      key: fs.readFileSync('./licensed+5-key.pem'),
      cert: fs.readFileSync('./licensed+5.pem'),
    },
  },
};
