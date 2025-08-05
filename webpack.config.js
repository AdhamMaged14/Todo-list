// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // clears old builds
  },
  mode: 'development',
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
