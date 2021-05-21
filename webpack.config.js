const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugcssin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
//Проверка в каком режиме собирается проект
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
//Поиск HTML

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            minify: {
                collapseWhitespace: isProd
            },
            inject: true,
        })
    })
}
const htmlPlugins = generateHtmlPlugins('./src/assets/html/views')

//Оптимизация??
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

//Добавление хэша в название файлов при режиме разработки
const fileName = ext => isDev ? `[name].[hash].${ext}` : `[name].${ext}`

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        {
            loader: 'css-loader',
            options: {
                url: true
            }
        }
    ];
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}


const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            filename:'index.html',
            template: 'index.html',
            chunks: ['index'],
            minify: {
                collapseWithSpace: isProd
            }
        }),

        new HtmlWebpackPlugin({
            filename:'catalog.html',
            template: 'catalog.html',
            chunks: ['catalog'],
            minify: {
                collapseWithSpace: isProd
            }
        }),

        new HtmlWebpackPlugin({
            filename:'card.html',
            template: 'card.html',
            chunks: ['card'],
            minify: {
                collapseWithSpace: isProd
            }
        }),

        new HtmlWebpackPlugin({
            filename:'order.html',
            template: 'order.html',
            chunks: ['order'],
            minify: {
                collapseWithSpace: isProd
            }
        }),
        new HtmlWebpackPlugin({
            filename:'basket.html',
            template: 'basket.html',
            chunks: ['basket'],
            minify: {
                collapseWithSpace: isProd
            }
        }),
        new HtmlWebpackPlugin({
            filename:'lk_login.html',
            template: 'lk_login.html',
            chunks: ['lk_login'],
            minify: {
                collapseWithSpace: isProd
            }
        }),
        new HtmlWebpackPlugin({
            filename:'lk_signin.html',
            template: 'lk_signin.html',
            chunks: ['lk_signin'],
            minify: {
                collapseWithSpace: isProd
            }
        }),
        new HtmlWebpackPlugin({
            filename:'lk.html',
            template: 'lk.html',
            chunks: ['lk'],
            minify: {
                collapseWithSpace: isProd
            }
        }),
        new HtmlWebpackPlugin({
            filename:'search.html',
            template: 'search.html',
            chunks: ['search'],
            minify: {
                collapseWithSpace: isProd
            }
        }),
       
        new HtmlWebpackPlugin({
            filename:'search-result.html',
            template: 'search-result.html',
            chunks: ['search-result'],
            minify: {
                collapseWithSpace: isProd
            }
        }),
       
        //new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'assets/img/', to: 'img'},
            ]
        }),

        new MiniCssExtractPlugin({
            filename: fileName('css'),
        })
    ]

    /*if(isProd){
        base.push(new BundleAnalyzerPlugin)
    }*/

    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: { 
        'index': ['@babel/polyfill', './index.js', './assets/js/pages/index.js'],
        'catalog': ['@babel/polyfill', './index.js', './assets/js/pages/catalog.js'],
        'card': ['@babel/polyfill', './index.js', './assets/js/pages/card.js'],
        'order': ['@babel/polyfill', './index.js', './assets/js/pages/order.js'],
        'basket': ['@babel/polyfill', './index.js', './assets/js/pages/basket.js'],
        'lk_login': ['@babel/polyfill', './index.js', './assets/js/pages/login.js'],
        'lk_signin': ['@babel/polyfill', './index.js', './assets/js/pages/signin.js'],
        'lk': ['@babel/polyfill', './index.js', './assets/js/pages/lk.js'],
        'search': ['@babel/polyfill', './index.js', './assets/js/pages/search.js'],
        'search-result': ['@babel/polyfill', './index.js', './assets/js/pages/search-result.js'],
    },
    output: {
        filename:  fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        //extensions: ['.js', '.json', '.png'],
        alias: {
            '@views': path.resolve(__dirname, 'src/html/views'),
            '@includes': path.resolve(__dirname, 'src/html/includes'),
            '@scss': path.resolve(__dirname, 'src/scss'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4300,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/html/includes'),
                loader: 'html-loader',
                options: {
                    minimize: false,
                }
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|svg|gif|jpg|jpeg|webp)$/,
                loader: 'file-loader?name=./img/[name].[ext]'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:
                    {
                        loader: 'babel-loader',
                        options: babelOptions()
                    },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader:
                    {
                        loader: 'babel-loader',
                        options: babelOptions("@babel/preset-typescript")
                    },
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader:
                    {
                        loader: 'babel-loader',
                        options: babelOptions("@babel/react")
                    },
            }

        ]
    }
}
