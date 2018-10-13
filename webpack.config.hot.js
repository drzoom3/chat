'use strict';

const path = require('path');
const webpack = require('webpack');
const CONFIG = require('./config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateLocalesPlugin = require('./src/utils/GenerateLocalesPlugin.js');

const NODE_MODULES_PATH = path.join(__dirname, 'node_modules');
const BUILD_PATH = path.join(__dirname, 'build');
const SRC_PATH = path.join(__dirname, 'src');

module.exports = {
  devtool: 'inline-source-map',

  context: SRC_PATH,

  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      './layouts/index'
    ]
  },

  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    chunkFilename: '[id].js',
    library:  '[name]',
    publicPath: '/'
  },
    
  module: {
    rules: [{
        test: /\.js$/,
        enforce: 'pre',
        use: ['eslint-loader'],
        include: [ SRC_PATH ]
      }
    ],
    rules: [{
        test:    /\.js$/,
        include: [
          SRC_PATH,
          path.join(NODE_MODULES_PATH, 'react-jam-ui')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { 'modules': false } ], 'stage-0', 'react'],            
            plugins: ['react-hot-loader/babel']
          }
        }
      }, {
        test:   /\.css$/,
        use: [{
            loader: 'style-loader'
          },{
            loader: 'css-loader?-import importLoaders=0'
          },{
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 2 versions']
                })
              ]
            }
          }]
      }, {
        test:   /\.styl$/,
        use: [{
            loader: 'style-loader'
          },{
            loader: 'css-loader?-import importLoaders=0'
          },{
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 2 versions']
                })
              ]
            }
          },{
            loader: 'stylus-loader?resolve url'
          }]
      }, {
        test: /\.html$/,
        use: ['html-loader']
      }, {
        test:   /\.(png|jpg|svg)$/,
        use: ['file-loader?limit=5000&name=images/[name].[hash:6].[ext]']
      }, {
        test:   /\.(ttf|eot|woff|woff2)$/,
        use: ['file-loader?name=fonts/[path][name].[hash:6].[ext]']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      'CONFIG': {
        'api_token': JSON.stringify(CONFIG.api_token),
        'api_url': JSON.stringify(CONFIG.api_url)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new HtmlWebpackPlugin({//for each entry point
      filename: 'index.html',
      chunks: ['common', 'index'],
      template: './layouts/index/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new GenerateLocalesPlugin('i18n/en.json', [
      './src/**/**/i18n/en.json'
    ]),
    new GenerateLocalesPlugin('i18n/ru.json', [
      './src/**/**/i18n/ru.json'
    ])
  ],
  devServer: {
    publicPath: '/',
    compress: false,
    hot: true,
    port: 8081,
    host: '0.0.0.0',
    stats: {
        colors: true,
        timings: true
    },
    contentBase: BUILD_PATH,
    historyApiFallback: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}