/* eslint-disable no-param-reassign */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },

  // Specify where the build files are to be placed
  outputDir: process.env.SSR ? (path.resolve(__dirname, 'dist/server')) : (path.resolve(__dirname, 'dist/client')),

  // Project deployment base
  // By default Vue assumes the app will be deployed at the root, https://www.host:port
  // If the app is deployed at a path, "publicPath" must be the value of the path, e.g. if
  // the app is deployed at https://host:port/my-app the publicPath is set to '/my-app'
  publicPath: '/',

  chainWebpack: (webpackConfig) => {
    // Settings common to both client and server bundles

    webpackConfig.module.rule('vue').uses.delete('cache-loader');
    webpackConfig.module.rule('js').uses.delete('cache-loader');
    webpackConfig.module.rule('ts').uses.delete('cache-loader');
    webpackConfig.module.rule('tsx').uses.delete('cache-loader');

    // enable our environment variables to be available in our application both on client and
    // server (note: environment variables starting with VUE_APP_ are automatically added)
    webpackConfig.plugin('define')
      .tap((args) => {
        args[0] = {
          ...args[0],
          'process.env.PORT': JSON.stringify(process.env.PORT),
        };
        return args;
      });

    if (!process.env.SSR) {
      // Client side bundle settings

      webpackConfig.devServer.disableHostCheck(true);

      // Specify the root file of the client application
      webpackConfig.entry('app').clear().add('./src/client/main.js');
    } else {
      // Server side bundle settings

      // inform WebPack that we are building a bundle for NodeJS rather
      // than for the browser and to avoid packaging built-ins.
      webpackConfig.target('node');

      // Specify the root file of the server application
      webpackConfig.entry('app').clear().add('./src/server/server.js');

      // specify the name of the built server bundle
      webpackConfig.output.filename('serverBundle.js');

      webpackConfig.output.libraryTarget('commonjs2');

      // Tell WebPack to not bundle any libraries into our output bundle on the server
      // if that library exists in the "node-modules" folder. This is because on the server
      // Node can get the dependencies from node_modules on start up therefore they do not
      // have to be in the bundle
      // (unlike with the client bundle which has to have all the dependencies in it)
      webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

      // tell webpack to only output a single javascript bundle (containing the
      // vendor and application JavaScript), by not splitting chunks:
      webpackConfig.optimization.splitChunks(false).minimize(false);

      // remove plugins we do not need in our application
      webpackConfig.plugins.delete('hmr');
      webpackConfig.plugins.delete('preload');
      webpackConfig.plugins.delete('prefetch');
      webpackConfig.plugins.delete('progress');
      webpackConfig.plugins.delete('friendly-errors');

      // console.log(webpackConfig.toConfig());
    }
  },
};
