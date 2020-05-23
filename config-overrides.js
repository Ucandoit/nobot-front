const webpack = require('webpack');

module.exports = function override(config, env) {
  // inject global variables for different profiles
  config.plugins.push(new webpack.DefinePlugin({
    ROOT_API: '"/."'
  }));
  // if (env === 'development') {
  // } else if (env === 'production') {
  //   config.plugins.push(new webpack.DefinePlugin({
  //     ROOT_API: '"/nobot-backend"'
  //   }));
  // }
  return config;
}