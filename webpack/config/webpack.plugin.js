/*
 * @Description: webpack plugin 的配置
 * @Author: F-Stone
 * @Date: 2021-08-02 15:37:16
 * @LastEditTime: 2021-08-02 15:37:17
 * @LastEditors: F-Stone
 */
const path = require("path");

const webpack = require("webpack");

/* ---------------------------------- */
/*             webpack env            */
/* ---------------------------------- */
const {
    PROJECT_NAME,
    NODE_ENV,
    OUT_PUT_PATH,
    IS_DEV_MODEL,
    WORKSPACE_FOLDER,
} = require("./webpack.env");

/* ---------------------------------- */
/*         webpack plugin base        */
/* ---------------------------------- */
// 这个Webpack插件将强制所有必需模块的整个路径与磁盘上实际路径的确切情况相匹配。
// 使用此插件有助于缓解OSX上的开发人员不遵循严格的路径区分大小写的情况，
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
// Friendly-errors-webpack-plugin识别某些类别的webpack错误，
// 并清理，聚合和优先级，以提供更好的开发人员体验。
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

/* ---------------------------------- */
/*           register tools           */
/* ---------------------------------- */
const { transformer, formatter } = require("../helper/resolve-loader-error");
new WebpackBuildNotifierPlugin({
    title: PROJECT_NAME,
    showDuration: true,
});

const WEBPACK_PLUGIN_BASE = [
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin({
        additionalTransformers: [transformer],
        additionalFormatters: [formatter],
    }),
    new WebpackBuildNotifierPlugin({
        title: PROJECT_NAME,
        showDuration: true,
    }),
    new webpack.ProgressPlugin(),
];

/* ---------------------------------- */
/*         webpack plugin dev         */
/* ---------------------------------- */
// 加快eslint检查，配合thread-loader+happyPackMode将会为其单独分配一个线程进行处理
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { DLL_PLUGIN } = require("./webpack.dll");
const { genHTMLPlugin } = require("./webpack.template");

const DEV_WEBPACK_PLUGIN = [
    ...WEBPACK_PLUGIN_BASE,
    ...genHTMLPlugin(),
    ...DLL_PLUGIN,
    new ForkTsCheckerWebpackPlugin({
        typescript: {
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            },
        },
    }),
    // 无需引入就能直接使用变量，webpack 在遇到对应变量的时候 将会自动导入文件
    new webpack.ProvidePlugin({
        $: "expose-loader?exposes=jQuery!jquery",
    }),
    // 设置环境变量信息
    // 默认浏览器环境下 process.env 会通过 webpack.mode 进行取值
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    // 拷贝文件
    new CopyPlugin({
        patterns: [
            {
                from: path.resolve(WORKSPACE_FOLDER, "public"),
                to: OUT_PUT_PATH,
                toType: "dir",
                globOptions: {
                    ignore: [".DS_Store", ".gitkeep"],
                },
                noErrorOnMissing: true,
            },
            {
                from: path.resolve(WORKSPACE_FOLDER, "dll"),
                to: OUT_PUT_PATH,
                toType: "dir",
                globOptions: {
                    ignore: [".DS_Store", "**/*.json", ".gitkeep"],
                },
                noErrorOnMissing: true,
            },
        ],
    }),
    new BundleAnalyzerPlugin({
        analyzerPort: "auto",
        analyzerMode: IS_DEV_MODEL ? "server" : "static",
        openAnalyzer: false,
    }),
];

/* ---------------------------------- */
/*         webpack plugin pro         */
/* ---------------------------------- */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { pathManage } = require("./webpack.path");

const PRO_WEBPACK_PLUGIN = [
    ...DEV_WEBPACK_PLUGIN,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: pathManage.css.fullPath,
        chunkFilename: pathManage.css.fullPath,
    }),
];

/* ---------------------------------- */
/*         webpack plugin dll         */
/* ---------------------------------- */

const DLL_WEBPACK_PLUGIN = [
    ...WEBPACK_PLUGIN_BASE,
    // 清理旧的 dll 文件
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(WORKSPACE_FOLDER, "dll/*")],
    }),
    new webpack.DllPlugin({
        name: "[name]_dll",
        path: path.resolve(WORKSPACE_FOLDER, "dll/[name].manifest.json"),
    }),
    new MiniCssExtractPlugin({
        filename: pathManage.css.path + "/[name].dll.css",
        chunkFilename: pathManage.css.path + "/[name].dll.css",
    }),
];

module.exports = {
    DEV_WEBPACK_PLUGIN,
    PRO_WEBPACK_PLUGIN,
    DLL_WEBPACK_PLUGIN,
};
