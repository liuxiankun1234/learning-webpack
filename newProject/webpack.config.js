const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    // JavaScript 执行入口文件
    entry: './js/index.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        /**
         * rules:
         *      Loader的配置区域
         *          告诉webpack在遇到哪些文件时使用哪些loader进行加载和转换
         *      遇到 .css文件
         *          先用css-loader读取CSS文件，再交给style-loader把CSS内容注入到JS里
        */
        rules: [
            {
                test: /\.css$/,
                /**
                 *  use属性
                 *      值需要是一个由Loader名称组成的数组，Loader的执行顺序是由后到前的
                 *      每一个Loader都可以通过URL querystring的方式传入参数
                 *          css-loader?minimize 告诉css-loader需要开启css压缩
                **/ 
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: `[name]_[contenthash:8].css`
        })
    ],
    devServer: {
        // 告诉服务器从哪里提供内容。只要你想提供静态文件时候才需要
        contentBase: path.join(__dirname, 'dist'),
        // 一切服务都启用
        compress: true,
        port: 9000,
    },
};
/**
 *  webpack 5版本
 *      不支持使用插件  extract-text-webpack-plugin
 *      替换成         mini-css-extract-plugin
 * 
 *      不支持使用插件  webpack-dev-sever 
 *      替换成         webpack-serve
 * 
 * 
 * 
 * 
*/