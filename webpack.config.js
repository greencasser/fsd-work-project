const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
      'index':'./src/index.js' 
},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [{ 
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/',
        },{
          test: /\.pug$/, 
          loader: 'pug-loader',
          options: {
                  pretty: true
            }
        },{
          test: /\.(png|jpg|gif|svg|jpeg)$/,
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            }
        },{
          test: /\.css$/, 
          exclude: /node-modules/,
          use: [{
            loader: MiniCssExtractPlugin.loader,
          },
            'css-loader',
          {
            loader: 'postcss-loader',
            options: {
            config: {path:'src/postcss.config.js'}                
            }
          } 
        ]
      },{
        test: /\.scss$/, 
        exclude: /node-modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {path:'src/postcss.config.js'} 
            }
        },
          'sass-loader'            
        ]
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index'],
        template: 'src/pages/index.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'second.html',
        chunks: ['index'],
        template: 'src/pages/second.pug'
      }),
      new MiniCssExtractPlugin({
        filename: 'css/main.css'
      })  
      
    ]
};