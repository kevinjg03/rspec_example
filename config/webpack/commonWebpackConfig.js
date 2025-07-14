// The source code including full typescript support is available at: 
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { generateWebpackConfig, merge } = require('shakapacker');
const webpack = require('webpack');

const baseClientWebpackConfig = generateWebpackConfig();

// Define si estamos en desarrollo para el tracing de Turbo
const devBuild = process.env.NODE_ENV !== 'production';

const commonOptions = {
  resolve: {
    extensions: ['.css', '.scss', '.sass', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TRACE_TURBOLINKS': devBuild,
    }),
  ],
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => merge({}, baseClientWebpackConfig, commonOptions);

module.exports = commonWebpackConfig;
