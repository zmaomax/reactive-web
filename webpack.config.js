const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

module.exports = {
  context: __dirname,
  entry: './js/reactiveWebApp.jsx',
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer:{
    publicPath : '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }]
        })
      }
    ]
  },
  plugins: [
      extractSass
  ]
};
