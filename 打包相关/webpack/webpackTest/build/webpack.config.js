const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MinicssExtractPlugin = require('mini-css-extract-plugin')
// 必须这么写，如果直接放入webpack的rules中会报错，找不到MinicssExtractPlugin
const MinicssExtractPluginLoader = MinicssExtractPlugin.loader
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

const {NODE_ENV = 'development'} = process.env

const cssLoaderConfig = [
    NODE_ENV === 'production'
        ? MinicssExtractPluginLoader
        : 'vue-style-loader',
    'css-loader',
    'postcss-loader',
    'stylus-loader'
]

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, '../src/index.js'),
        token: path.resolve(__dirname, '../src/token.js')
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/token.html'),
            filename: 'token.html',
            chunks: ['token']
        }),
        new MinicssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[id].css'
        }),
        new CssMinimizerPlugin(),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /.(jpe?g|gif|png)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: cssLoaderConfig
            },
            {
                test: /.styl$/,
                use: [
                    ...cssLoaderConfig,
                    'stylus-loader'
                ]
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage'
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loader: {
                                css: cssLoaderConfig
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue']
    }
}