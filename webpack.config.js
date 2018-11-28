module.exports = {
  entry: [
    'babel-polyfill',
    __dirname + '/src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
    publicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      }
    ],
  },
};
