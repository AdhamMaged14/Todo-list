// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // clears old builds
  },
   plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // use your own index.html here
    }),
  ],
  mode: 'development', // or 'development' for dev mode
  devServer: {
    static: './dist',
    port: 8080, // default port
    open: true, // opens browser on serve
    hot: true,  // enable HMR
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
