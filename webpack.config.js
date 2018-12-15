/**
 * webpack.config.js created on 2016. 12. 01.
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */

const pkg = require('./package.json');
const webpack = require('webpack');
const SafeUmdPlugin = require('safe-umd-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const isProduction = process.argv.indexOf('-p') > -1;

const FILENAME = pkg.name + (isProduction ? '.min' : '');
const BANNER = [
    `${FILENAME}.js`,
    `@version ${pkg.version}`,
    `@author ${pkg.author}`,
    `@license ${pkg.license}`
].join('\n');

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
        library: ['tui', 'ImageEditor'],
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        filename: `${FILENAME}.js`
    },
    externals: {
        'tui-code-snippet': {
            'commonjs': 'tui-code-snippet',
            'commonjs2': 'tui-code-snippet',
            'amd': 'tui-code-snippet',
            'root': ['tui', 'util']
        },
        'fabric/dist/fabric.require': {
            'commonjs': 'fabric/dist/fabric.require',
            'commonjs2': 'fabric/dist/fabric.require',
            'amd': 'fabric/dist/fabric.require',
            'root': ['fabric']
        }
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.styl']
    },
    module: {
        rules : [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
            {
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","stylus-loader"],
                    publicPath: "/src/css"
                })
            }

        ]
    },
    plugins: [
        new webpack.BannerPlugin(BANNER),
        new ExtractTextPlugin(`${FILENAME}.css`),
        new SafeUmdPlugin()
    ],
    devServer: {
        historyApiFallback: false,
        progress: true,
        inline: true,
        host: '0.0.0.0',
        disableHostCheck: true
    }
};
