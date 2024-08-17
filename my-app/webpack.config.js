const path = require('path');

module.exports = {
  
  entry: './src/index.js',

  // Output configuration
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // Module and rules
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',  // Fonts will be output in 'dist/fonts'
        },
      },
     
    ],
  },

  
};
