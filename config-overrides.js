const webpack = require('webpack');

module.exports = function override(config, env) {
  // inject global variables for different profiles
  if (env === 'development') {
    config.plugins.push(new webpack.DefinePlugin({
      ROOT_API: '"."'
    }));
  } else if (env === 'production') {
    config.plugins.push(new webpack.DefinePlugin({
      ROOT_API: '"/nobot-backend"'
    }));
  }
  return config;
}