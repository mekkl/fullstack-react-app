/* eslint-disable */
var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var browserConfig = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: 'bundle.js',
    publicPath: '/public'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.(jsx)$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ 'css-loader' ]
          })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.css'
    })
  ]
}

var serverConfig = {
  entry: './src/server/index.js',
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
	},
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.(jsx)$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ 'css-loader' ]
          })
      }
    ]
  },
  plugins: []
}

module.exports = [browserConfig, serverConfig]