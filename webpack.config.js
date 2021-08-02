/*
 * @Description: webpack config
 * @Author: F-Stone
 * @Date: 2021-08-02 10:40:28
 * @LastEditTime: 2021-08-02 10:40:41
 * @LastEditors: F-Stone
 */
const WEBPACK_DEV_CONFIG = require("./webpack/webpack.dev.config");
const WEBPACK_PRO_CONFIG = require("./webpack/webpack.pro.config");

module.exports =
    process.env.NODE_ENV == "development"
        ? WEBPACK_DEV_CONFIG
        : WEBPACK_PRO_CONFIG;
