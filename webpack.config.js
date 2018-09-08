/* eslint-disable indent */
const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const dev = process.env.NODE_ENV !== 'production';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/public/index.html'),
  filename: 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    html5: true,
  },
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {
    from: path.join(__dirname, '/public'),
  },
]);

const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
});

const OfflinePluginConfig = new OfflinePlugin({
  appShell: '/',
  autoUpdate: true,
});

const config = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html?$/,
        loader: 'html-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: dev
    ? [
        HTMLWebpackPluginConfig,
        CopyWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin(),
      ]
    : [
        HTMLWebpackPluginConfig,
        CopyWebpackPluginConfig,
        DefinePluginConfig,
        OfflinePluginConfig,
      ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
};

module.exports = config;
