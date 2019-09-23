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
      new MiniCssExtractPlugin({
        filename: 'css/main.css'
      })  
      
    ]
};
//Generate HTML pages 
['ui_kit'].forEach(item => {
  module.exports.plugins.push(
    new HtmlWebpackPlugin({
        filename: item + '.html',
        chunks: ['index'],
        template: 'src/pages/' + item + '.pug'
    })
  )
});