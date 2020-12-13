const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  /* context: path.resolve(__dirname, 'src'), */
  mode: 'development',
  entry: './script/script.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(
      {
        cleanOnceBeforeBuildPatterns: ['**/*', '!assets/**'],
      },
    ),
  ],
  resolve: {
    extensions: ['.js', '.json', '.css', '.png', '.jpg'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.mp3$/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.otf$/,
        use: ['file-loader'],
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
    ],
  },
};
