const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

const CSSLoader = {
  loader: "css-loader",
  options: {
    modules: true,
    importLoaders: 1,
    localIdentName: "[name]_[local]_[hash:base64]",
    sourceMap: true
  }
};

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

const plugins = [htmlPlugin];

if (isProd) {
  plugins.push(cssPlugin);
}

module.exports = {
  entry: {
    main: './src/index',
    vendor: [
      'normalize.css',
      'prop-types',
      'react',
      'react-autobind',
      'react-dnd',
      'react-dnd-html5-backend',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redan',
      'redux',
      'redux-thunk',
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: isProd 
          ? [ MiniCssExtractPlugin.loader, CSSLoader ]
          : [ "style-loader", CSSLoader ],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]",
          },
        },
      },
    ],
  },
  plugins: plugins,
  devServer: {
    port: 8080,
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
};
