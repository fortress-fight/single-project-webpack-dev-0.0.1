/*
 * @Description: dll webpack 配置
 * @Author: F-Stone
 * @Date: 2021-08-02 16:29:54
 * @LastEditTime: 2021-08-02 16:29:55
 * @LastEditors: F-Stone
 */

const path = require("path");

const webpackRules = require("./config/webpack.rule");
const { WEBPACK_MINIMIZE } = require("./config/webpack.min");
const { DLL_WEBPACK_PLUGIN } = require("./config/webpack.plugin");
const { WORKSPACE_FOLDER, DEVICE } = require("./config/webpack.env");

module.exports = {
    mode: "production",
    performance: {
        assetFilter: function (assetFilename) {
            return (
                assetFilename.endsWith(".js") || assetFilename.endsWith(".css")
            );
        },
    },
    entry: {
        vendor: ["jquery"].concat([
            "font-awesome/scss/font-awesome.scss",
            "sanitize.css",
            "sanitize.css/forms.css",
            "sanitize.css/typography.css",
            "animate.css",
        ]),
    },
    output: {
        publicPath: "/",
        filename: "script/[name].dll.js",
        path: path.resolve(WORKSPACE_FOLDER, "dll/" + DEVICE),
        library: "[name]_dll",
    },
    resolveLoader: {
        modules: [path.resolve(WORKSPACE_FOLDER, "node_modules")],
    },
    module: {
        rules: ["css", "dllScss", "images", "svg", "media", "fonts", "js"].map(
            (item) => webpackRules[item]
        ),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", "scss", ".json"],
    },
    // plugins的配置
    optimization: {
        ...WEBPACK_MINIMIZE,
    },
    plugins: [...DLL_WEBPACK_PLUGIN],
};
