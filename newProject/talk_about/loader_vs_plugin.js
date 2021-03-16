/**
 *  Loader 与 plugin是啥
 *      webpack把一切文件都看做模块，css也不例外
 *      要引入css文件，需要在JS文件入口引入css文件
 *      webpack原生不支持解析CSS文件。需要使用Loader解析
 *      Loader
 *          可以看做具有文件转换功能的翻译员
 *          配置里module.rules配置一组规则，告诉webpack在遇到哪些文件时，使用哪些Loader去加载和转换
 *          use属性
 *              值需要是一个由Loader名称组成的数组，Loader的执行顺序是由后到前的
 *                  Loader都可以通过URL querystring的方式传入参数
 *                  css-loader?minimize 告诉css-loader需要开启css压缩
 *              Loader也可以通过Obejct传入
 *              
 * 
 *      Plugin
 *          扩展Webpack功能 在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事
 *  
 * 
 * 
**/