/*
 * @Description: 别名配置
 * @Author: F-Stone
 * @Date: 2021-08-02 17:15:58
 * @LastEditTime: 2021-08-02 17:15:59
 * @LastEditors: F-Stone
 */

/* ---------------------------------- */
/*            node modules            */
/* ---------------------------------- */
const path = require("path");

/* ---------------------------------- */
/*               set env              */
/* ---------------------------------- */
const { WORKSPACE_FOLDER, PROJECT_NAME } = require("../config/webpack.env");

exports.WEBPACK_ALIAS = {
    $root: WORKSPACE_FOLDER,
    "@": path.resolve(WORKSPACE_FOLDER, "src/"),
    "@desktop": path.resolve(WORKSPACE_FOLDER, "src/desktop"),
    "@mobile": path.resolve(WORKSPACE_FOLDER, "src/mobile"),
    PROJECT_NAME,
};
