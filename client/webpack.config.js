'use strict';

/**
 * Webpack Config
 */
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

// plugins
const workboxPlugin = require('workbox-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const isProduction = process.env.NODE_ENV === 'production';
const buildMode = process.env.NODE_MODE;

const APP_DIR = path.resolve(__dirname, './src');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = !isProduction ? '/' : publicPathURL(buildMode);

function publicPathURL(env) {
    switch (env) {
        case 'development':
            return '/admin/';
        case 'qa':
            return '/admin/';
        case 'staging':
            return '/admin/';
        case 'production':
            return '/admin/';
    }
}

function proxyTargetURL(env) {
    switch (env) {
        case 'development':
            return 'https://localhost:5000/';
        case 'qa':
            return 'https://localhost:5000/';
        case 'staging':
            return 'https://localhost:5000/';
        case 'production':
            return 'https://localhost:5000/';
    }
}

function modeFile(env) {
    switch (env) {
        case 'development':
            return 'dev';
        case 'qa':
            return 'qa';
        case 'staging':
            return 'staging';
        case 'production':
            return 'prod';
    }
}

function modeName(env) {
    switch (env) {
        case 'development':
            return 'Development';
        case 'qa':
            return 'QA';
        case 'staging':
            return 'Staging';
        case 'production':
            return 'Production';
    }
}

const keycloakPath = !isProduction ? './keycloak-local.json' : `./keycloak-${modeFile(buildMode)}.json`;
const proxyTarget = !isProduction ? 'http://localhost:5000/' : proxyTargetURL(buildMode);
const envPath = !isProduction ? './.env-local' : `./.env-${modeFile(buildMode)}`;

console.log("Keycloak Used:", keycloakPath);
console.log(".env Used:", envPath);
console.log("Server Target:", proxyTarget + '\n');
console.log("Mode:", isProduction ? modeName(buildMode) + '\n\n' : 'Local' + '\n\n');

// the path(s) that should be cleaned
let pathsToClean = [
    'build'
]

// the clean options to use
let cleanOptions = {
    root: __dirname,
    verbose: false, // Write logs to console.
    dry: false
}

module.exports = {
    mode: !isProduction ? 'development' : 'production',
    target: 'web',
    entry: {
        app: !isProduction ? [
            "core-js/stable",
            "regenerator-runtime/runtime",
            "react-hot-loader/patch?quiet=true",
            "./src/index.js"
        ] : [
            "./src/index.js"
        ]
    },
    output: !isProduction ? {
        path: path.join(__dirname, 'build'),
        filename: 'assets/js/[name].[hash].min.js',
        publicPath: publicPath,
        sourceMapFilename: 'assets/js/[name].[hash].js.map',
        chunkFilename: 'assets/js/[id].[hash].min.js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    } : {
        path: path.join(__dirname, 'build'),
        filename: 'assets/js/[name].[hash].min.js',
        publicPath: publicPath,
        sourceMapFilename: 'assets/js/[name].[hash].js.map',
        chunkFilename: 'assets/js/[id].[hash].min.js'
    },
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        host: 'localhost',
        contentBase: !isProduction ? './src/index.js' : './build/',
        watchContentBase: !isProduction ? true : false,
        compress: !isProduction ? false : true,
        port: 3001, // port number
        historyApiFallback: true,
        quiet: true,
        publicPath: publicPath,
        stats: {
            modules: !isProduction ? true : false,
            chunks: !isProduction ? true : false,
            warnings: !isProduction ? true : false,
        },
        proxy: {
            '/api/': {
                target: proxyTarget,
                secure: false
            }
        },
        hot: !isProduction ? true : false
    },
    devtool: !isProduction ? '#inline-source-map' : 'cheap-module-source-map',
    plugins: [
        new ProgressBarPlugin(),
        new CheckerPlugin(),
        !isProduction ? new webpack.HotModuleReplacementPlugin() :
            new workboxPlugin.GenerateSW({
                swDest: './src/serviceWorker.js',
                clientsClaim: true,
                skipWaiting: true,
            }),
        // new ModernizrWebpackPlugin({
        //     htmlWebpackPlugin: false,
        // }),
        new HtmlWebpackPlugin({
            title: 'Humdard-e-kuparwa',
            template: './public/index.html',
            filename: 'index.html',
            // manifest: './public/manifest.json',
            favicon: './public/favicon.ico',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
        }),
        new CopyWebpackPlugin([
            { from: './src/assets/images', to: 'assets/images' },
            { from: keycloakPath, to: 'keycloak.json' },
            { from: './src/serviceWorker.js', to: 'serviceWorker.js' }
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
        }),
        new Dotenv({
            path: envPath, // Path to .env file (this is the default)
            safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].[hash:8].css",
            disable: false,
            allChunks: true,
            chunkFilename: 'assets/css/[id].[hash:8].css',
        }),
        !isProduction ? new FriendlyErrorsWebpackPlugin() :
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(css)$'),
                threshold: 10240,
                minRatio: 0.8,
            }),
        new MonacoWebpackPlugin({
            languages: ['json', 'html']
        }),
        require('autoprefixer'),
        new webpack.DefinePlugin({
            'process.env': { PUBLIC_PATH: JSON.stringify(publicPath) },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                include: MONACO_DIR,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                include: MONACO_DIR,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, './node_modules/react-summernote/dist'), APP_DIR],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss'
                        }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|bmp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?v=[a-z0-9=\.]+)?$/i,
                loader: 'url-loader?limit=100000&name=assets/fonts/[name].[hash:8].[ext]'
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader',
                    options: {
                        inline: true
                    }
                }
            }
        ],
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: !isProduction ? {} : {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `vendor.${packageName.replace('@', '')}`;
                    },
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
        minimizer: !isProduction ? [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin()
        ] : [
            new OptimizeCSSAssetsPlugin()
        ]
    },

    resolve: {
        extensions: !isProduction ? ['.js', '.jsx'] : ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'react-dom': !isProduction ? '@hot-loader/react-dom' : 'react-dom'
        }
    },

    watchOptions: {
        ignored: ['build', 'node_modules']
    }
};
