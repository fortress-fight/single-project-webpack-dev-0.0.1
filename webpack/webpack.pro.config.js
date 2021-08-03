/*
 * @Description: webpack 生产环境配置
 * @Author: F-Stone
 * @Date: 2021-08-02 18:33:28
 * @LastEditTime: 2021-08-02 18:33:29
 * @LastEditors: F-Stone
 */

/* ---------------------------------- */
/*             npm modules            */
/* ---------------------------------- */
const { merge } = require("webpack-merge");

const WEBPACK_BASE_CONFIG = require("./webpack.base.config");
const { WEBPACK_MINIMIZE } = require("./config/webpack.min");
const { PRO_WEBPACK_PLUGIN } = require("./config/webpack.plugin");

// eslint-disable-next-line no-unused-vars
module.exports = (env, argv) => {
    return merge(WEBPACK_BASE_CONFIG, {
        // ["webpack-dev-server": "^3.11.0","webpack-fix-style-only-entries": "^0.6.0"]
        // 问题：在缺少 target 将会导致 webpack-dev-server hot 失效
        // https://github.com/webpack/webpack-dev-server/issues/2758
        target: "browserslist",
        devtool: false,
        // 模式
        mode: "production",
        // plugins的配置
        plugins: PRO_WEBPACK_PLUGIN,
        optimization: {
            ...WEBPACK_MINIMIZE,
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: "vendors",
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: "initial",
                        minChunks: 2,
                    },
                    common: {
                        name: "chunk-common",
                        minChunks: 2,
                        priority: -20,
                        chunks: "initial",
                        reuseExistingChunk: true,
                    },
                    lib: {
                        test: /[\\/]node_modules[\\/].+\.js$/,
                        priority: 10,
                        minChunks: 1,
                        minSize: 1000,
                        enforce: true,
                    },
                },
            },
        },
    });
};
