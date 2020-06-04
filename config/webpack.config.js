const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const mode = process.env.NODE_ENV;
const appDirectory = fs.realpathSync(process.cwd());

const isDev = mode === 'development';

const plugins = [
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html', //打包后的文件名
        minify: {
            removeAttributeQuotes: false, //是否删除属性的双引号
            collapseWhitespace: false, //是否折叠空白
        },
        // chunks: ['index'], 用于多页面根据entry来设置
        // hash: true //是否加上hash，默认是 false
    }),
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'], //不删除dll目录下的文件
    }),
    // new webpack.ProvidePlugin({
    //     React: 'react',
    //     Component: ['react', 'Component'],
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        //个人习惯将css文件放在单独目录下
        //publicPath:'../'   //如果你的output的publicPath配置的是 './' 这种相对路径，那么如果将css文件放在单独目录下，记得在这里指定一下publicPath
    }),
    new webpack.HotModuleReplacementPlugin(), //热更新
];

if (!isDev) {
    plugins.push(new OptimizeCssPlugin());
    plugins.push(
        new webpack.DllReferencePlugin({
            manifest: path.resolve(appDirectory, 'dist', 'dll', 'manifest.json'),
        }),
    );
} else {
    plugins.pop();
    plugins.push(new HardSourceWebpackPlugin());
}

const config = {
    mode,
    entry: './src/index.tsx',
    output: {
        path: path.resolve(appDirectory, 'dist'), //必须是绝对路径
        filename: 'bundle.[hash].js',
        publicPath: isDev ? '/' : './', //通常是CDN地址
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias:{
            features:path.resolve(appDirectory, 'src/features'),
            components:path.resolve(appDirectory, 'src/components'),
            app:path.resolve(appDirectory, 'src/app')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts)(x?)$/,
                use: ['thread-loader', 'cache-loader', 'babel-loader'],
                exclude: /node_modules/,
                include: [[path.resolve(appDirectory, 'src')]],
            },
            {
                test: /\.(c|le)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('autoprefixer')];
                            },
                        },
                    },
                    'less-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            outpath: 'assets',
                            limit: 10240, //10K
                            esModule: false,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins,
    optimization: {
        runtimeChunk: {
            name: 'manifest',
        },
        splitChunks: {
            //分割代码块
            cacheGroups: {
                vendor: {
                    //第三方依赖
                    priority: 1, //设置优先级，首先抽离第三方模块
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1, //最少引入了1次
                },
                //缓存组
                common: {
                    //公共模块
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100, //大小超过100个字节
                    minChunks: 3, //最少引入了3次
                },
            },
        },
    },
};

if (isDev) {
    config.devServer = {
        port: '3000',
        hot: true,
    };
}

module.exports = config;
