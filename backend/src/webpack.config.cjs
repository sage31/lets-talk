// webpack.config.js
const path = require('path');

module.exports = {
  entry: './index.mjs', // <-- replace with your handler entry
  target: 'node',    // important: build for Node.js, not browsers
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.mjs',
    library: {
      type: "module"
    },
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json'],
  },
  externals: {
    'aws-sdk': 'commonjs aws-sdk',
  },
  optimization: {
    minimize: true,
    usedExports: true
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        type: 'asset/source', // built-in: imports as string
      },
    ],
  },
};
