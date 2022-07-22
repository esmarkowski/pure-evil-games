const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    pureevil: './lib/com/pureevil/Main.js'
  },
  devtool: 'eval',
  devServer: {
   static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'PureEvilGames',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }
};