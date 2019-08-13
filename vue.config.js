var ManifestPlugin = require('webpack-manifest-plugin');

// vue.config.js
module.exports = {
    outputDir: './dist',
    pages: {
        index: {
            entry: 'demo/main.js'
        }
    },
    configureWebpack: {
        output: {
            libraryExport: 'default'
        },
        plugins: [
            // new ManifestPlugin()
        ]
    },
};
