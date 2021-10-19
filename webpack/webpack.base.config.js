/*
 * @Description: webpack 配置中开发与生产的公共部分
 * @Author: F-Stone
 * @Date: 2021-08-02 18:36:41
 * @LastEditTime: 2021-08-02 18:36:43
 * @LastEditors: F-Stone
 */

const path = require("path");

const {
    WORKSPACE_FOLDER,
    PUBLIC_PATH,
    OUT_PUT_PATH,
    DEVICE,
} = require("./config/webpack.env");

const WEBPACK_RULES = require("./config/webpack.rule");
const { WEBPACK_ALIAS } = require("./config/webpack.alias");
const { pathManage } = require("./config/webpack.path");

// eslint-disable-next-line no-unused-vars
module.exports = {
    performance: {
        assetFilter: function (assetFilename) {
            return (
                assetFilename.endsWith(".js") || assetFilename.endsWith(".css")
            );
        },
    },
    entry: {
        app: path.resolve(WORKSPACE_FOLDER, `src/${DEVICE}/app.ts`),
    },
    output: {
        filename: pathManage.js.fullPath,
        chunkFilename: pathManage.js.fullPath,
        publicPath: PUBLIC_PATH,
        path: OUT_PUT_PATH,
    },
    resolveLoader: {
        modules: [path.resolve(WORKSPACE_FOLDER, "node_modules")],
    },
    module: {
        // loader的配置
        rules: [
            "ejs",
            "css",
            "scss",
            "images",
            "svg",
            "media",
            "fonts",
            "js",
            "ts",
            "eslint",
        ].map((item) => WEBPACK_RULES[item]),
    },
    resolve: {
        alias: WEBPACK_ALIAS,
        extensions: [".ts", ".tsx", ".js", ".jsx", "scss", ".json"],
    },
};
