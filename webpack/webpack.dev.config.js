/*
 * @Description: webpack 开发环境配置
 * @Author: F-Stone
 * @Date: 2021-08-02 17:07:33
 * @LastEditTime: 2021-08-02 17:07:33
 * @LastEditors: F-Stone
 */

const path = require("path");
/* ---------------------------------- */
/*             npm modules            */
/* ---------------------------------- */
const { merge } = require("webpack-merge");

const WEBPACK_BASE_CONFIG = require("./webpack.base.config");
const { WEBPACK_SERVER_CONFIG } = require("./config/webpack.devserver");
const { DEV_WEBPACK_PLUGIN } = require("./config/webpack.plugin");
const { WORKSPACE_FOLDER, OUT_PUT_DIR } = require("./config/webpack.env");

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
    return merge(WEBPACK_BASE_CONFIG, {
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 500,
            ignored: [
                path.resolve(WORKSPACE_FOLDER, "node_modules"),
                path.resolve(WORKSPACE_FOLDER, OUT_PUT_DIR),
            ],
        },
        // ["webpack-dev-server": "^3.11.0","webpack-fix-style-only-entries": "^0.6.0"]
        // 问题：在缺少 target 将会导致 webpack-dev-server hot 失效
        // https://github.com/webpack/webpack-dev-server/issues/2758
        target: "web",
        devtool: "eval-source-map",
        devServer: WEBPACK_SERVER_CONFIG,
        mode: "development",
        plugins: DEV_WEBPACK_PLUGIN,
    });
};
