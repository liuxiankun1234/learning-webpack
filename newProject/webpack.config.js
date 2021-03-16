const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    /**
     *  提供mode配置选项，告知webpack使用相应模式的内置优化
     *  类型     String
     *  使用     命令行和配置文件 webpack --mode=production or {mode: 'production'}
     *  选项     development
     *              会将process.env.NODE_ENV的值设置为development。
     *              启用 NamedChunksPlugin
     *                  NamedModulesPlugin // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
     *         production
     *              会将process.env.NODE_ENV的值设置为production。
     *              启用 FlagDependencyUsagePlugin
     *                  FlagIncludedChunksPlugin
     *                  ModuleConcatenationPlugin
     *                  NoEmitOnErrorsPlugin
     *                  OccurrenceOrderPlugin
     *                  SideEffectsFlagPlugin
     *                  UglifyJsPlugin
    */
    mode: 'development',
    // JavaScript 执行入口文件
    entry: './js/index.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 打包的输出文件都放到 dist 目录下
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
                 *      Loader都可以通过URL querystring的方式传入参数
                 *          css-loader?minimize 告诉css-loader需要开启css压缩
                 *      Loader也可以通过Obejct传入
                 *          
                **/ 
                // use: [MiniCssExtractPlugin.loader, 'css-loader?minimize'],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: `[name]_[contenthash:8].css`
        }),
        // new HtmlWebpackPlugin({
        //     template: './html/login.html'
        // }),
        new HtmlWebpackPlugin({
            template: './html/index.html'
        })
    ],
    devServer: {
        /**
         * 类型     Boolean String Array
         * 告诉服务器从哪里提供静态资源文件，服务器读取静态资源的位置
         * Array类型
         *      可以配置提供多个静态资源文件地址
         * Boolean类型
         *      false 可以禁用静态资源
        */
        contentBase: [
            path.join(__dirname, 'dist'),
            path.join(__dirname, 'public'),
        ],
        /**
         * 类型     Boolean
         * 是否启动gzip压缩应用于一切服务
         * 
         * 响应头
         *  Content-Encoding: gzip
        */
        compress: true,
        // 
        port: 9000,
        /**
         * 类型     Boolean
         * 启动lazy时，dev-server只有在请求时才编译包。这意味着webpack不会监视任何文件改动
         * watchOptions 在使用惰性模式时无效
        */
        lazy: false,
        /**
         * 类型     String
         * 在惰性模式中，此选项可减少编译。默认在惰性模式，每个请求结果都会产生新的编译
         * 使用filename可以只在某个文件被请求时编译
         * 
        */
        filename: 'bundle.js',
        /**
         * 好像没有这个指令
         * 类型     Boolean
         * 默认     false
         * 启动watch模式，意味着在初始构建之后，webpack将继续监听任何已解析文件的更改
         * webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。
        */
        // watch: true,
        /**
         * 类型     Object
         * 一组定制watch模式的选项 可理解为watch的配置项
         * 属性
         *      aggregateTimeout
         *          类型    Number
         *          单位    毫秒
         *          当第一个文件更改，会在重新构建前增加延迟。这个选项允许webpack将这段时间内进行的任何修改聚合到一次构建内
         *          等同于JS节流 每隔一段时间执行一次
         *      ignored
         *          支持 正则 字符串
         *          对于某些系统，监听大量文件系统会导致大量的CPU或者内容的占用。这个选项可以排除一些巨大的文件夹
         *          例如 /node_modules/ 'files/**\/.*js'
         *      poll
         *          类型    Number|Boolean
         *          单位    毫秒
         *          通过传递true开启polling，或者指定毫秒为单位进行轮询
         *          
        */
        watchOptions: {
            aggregateTimeout: 1,
            ignored: /node_modules/,
            poll: 1
        },
        open: true,
        /**
         * 类型     Function
         * 提供一个执行自定义中间件的能力
         * 在服务内其他中间件处理之前
        */
        before() {
            console.log('before~~~~~~~~~~~~~~~~~~~~~~~~')
        },
        /**
         * 类型     Function
         * 提供一个执行自定义中间件的能力
         * 在服务内其他中间件处理完成之后
        */
        after() {

            console.log('end~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        },
        /**
         * 类型     array
         * 此选项使您可以允许访问开发服务器的服务列入白名单
         * 支持.作为通配符
        */
        allowedHosts: [
            '.host.com'
        ],
        /**
         * 类型     Boolean
         * 默认     false
         * 此选项开启时 通过ZeroConf网络广播服务器
         * 
         *  bonjour: https://baike.baidu.com/item/bonjour/9830184?fr=aladdin
         *  终端会多输出一个信息
         *  Broadcasting "http" with subtype of "webpack" via ZeroConf DNS (Bonjour)
        */ 
        bonjour: false,
        /**
         * 类型     Boolean
         * 默认     true 启动内联模式 
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
         * 类型     Boolean
         * 设置为true绕过域名检查，不推荐App不进行域名检查
         * 主机容易受到DNS重绑定攻击
         * ?????? 未理解 ?????? 
        */
        disableHostCheck: true,
        /**
         * 类型     Object
         * 在所有的响应头上添加首部内容
        */
        headers: {
            "X-Custom-Foo": "bar",
            "Last-Modified": '1'
        },
        /**
         * 类型     Boolean|Object
         * 
        */
        historyApiFallback: {
            
        }
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