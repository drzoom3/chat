'use strict';

const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateLocalesPlugin = require('./src/utils/GenerateLocalesPlugin.js');

const NODE_MODULES_PATH = path.join(__dirname, 'node_modules');
const BUILD_PATH = path.join(__dirname, 'build');
const SRC_PATH = path.join(__dirname, 'src');

module.exports = {  
  context: SRC_PATH,
  entry: {
    index: [ './layouts/index' ]
  },
  output: {
    path: BUILD_PATH,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/chunk/[id].[chunkhash].js',
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
            presets: [ ['env', { 'modules': false } ], 'stage-0', 'react']
          }
        }
      }, {
        test:   /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
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
        })
        //loader: ExtractTextPlugin.extract('style', 'css!postcss')
      }, {
        test:   /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
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
        }) 
        //loader: ExtractTextPlugin.extract('style', 'css?-import importLoaders=0!postcss!stylus?resolve url')
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
/*
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.styl']
  },*/
  
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:base64:10].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      prettyPrint: true
    }),
    new HtmlWebpackPlugin({//for each entry point
      filename: 'index.html',
      chunks: ['common', 'index'],
      template: './layouts/index/index.html'
      //inject: 'head'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // don't show unreachable variables etc
        warnings:     false,
        drop_console: true,
        unsafe:       true
      },
      comments: false
    }),
    new GenerateLocalesPlugin('i18n/en.json', [
      './src/**/**/i18n/en.json'
    ]),
    new GenerateLocalesPlugin('i18n/ru.json', [
      './src/**/**/i18n/ru.json'
    ])
  ]
}