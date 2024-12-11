const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'), // ビルド成果物をpublicフォルダへ
    filename: 'bundle.js'
  },
  mode: 'production', // 本番ビルドならproduction
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new Dotenv() // これで.envファイルの内容がprocess.envに注入される
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
