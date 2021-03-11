const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        }),
        new HtmlWebpackPlugin({
            template: './html/login.html'
        }),
        
        new HtmlWebpackPlugin({
            template: './html/index.html'
        })
    ],
    devServer: {
        /**
         * 类型 Boolean String Array
         * 告诉服务器从哪里提供内容。只有在你想要提供静态文件才需要。devServer.publicPath将用于确定应该从哪里提供bundle，并且此选项优先
         * 
        */
        contentBase: path.join(__dirname, 'dist'),
        /**
         * 类型 Boolean
         * 是否启动gzip压缩应用于一切服务
         * 
         * 响应头
         *  Content-Encoding: gzip
        */
        compress: true,
        // 
        port: 9000,
        open: true,
        /**
         * 类型 Function
         * 提供一个执行自定义中间件的能力
         * 在服务内其他中间件处理之前
        */
        before() {
            console.log('before~~~~~~~~~~~~~~~~~~~~~~~~')
        },
        /**
         * 类型 Function
         * 提供一个执行自定义中间件的能力
         * 在服务内其他中间件处理完成之后
        */
        after() {

            console.log('end~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        },
        /**
         * 类型 array
         * 此选项使您可以允许访问开发服务器的服务列入白名单
         * 支持.作为通配符
        */
        allowedHosts: [
            '.host.com'
        ],
        /**
         * 类型 Boolean
         * 默认 false
         * 此选项开启时 通过ZeroConf网络广播服务器
         * 
         *  bonjour: https://baike.baidu.com/item/bonjour/9830184?fr=aladdin
         *  终端会多输出一个信息
         *  Broadcasting "http" with subtype of "webpack" via ZeroConf DNS (Bonjour)
        */ 
        bonjour: false,
        /**
         * 类型 Boolean
         * 默认 true 启动内联模式 
         * 在dev-server的两种不同模式之间切换 
         * ?????? 未理解 ?????? 
        */
        inline: true,
        /**
         * 类型     string 
         * 默认     info
         * 其他值   none error warning info
         * 当使用内联模式时，在开发工具的控制台将显示消息，如：在重新加载之前、在一个错误之前、或者模块热代替启用时。
         * ?????? 未理解 ?????? 
        */
        clientLogLevel: 'none',
        /**
         * 类型 Boolean
         * 在控制台 开启/禁用彩色输出
         * 只用于命令行工具
         * --color
        */
        // color: true,
        // hot: true,
        // watch: true
    },
};
/**
 *  webpack 5版本
 *  遇到问题
 *      1
 *          不支持使用插件  extract-text-webpack-plugin
 *          替换成         mini-css-extract-plugin
 *      2
 *          package.json的scripts文件执行错误        webpack-dev-sever --config webpack.config.js
 *          替换成                                  webpack serve  --config webpack.config.js
 *      
 *      3
 *          webpack不会自动打包成HTML文件
 *          需要引入插件 HtmlWebpackPlugin
 * 
 * 
 * 
 * 
*/