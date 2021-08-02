/*
 * @Description: 添加 webpack 变量
 * @Author: F-Stone
 * @Date: 2021-08-02 13:57:04
 * @LastEditTime: 2021-08-02 13:57:04
 * @LastEditors: F-Stone
 */

/* ---------------------------------- */
/*            node_modules            */
/* ---------------------------------- */
const path = require("path");

/* ---------------------------------- */
/*            env variable            */
/* ---------------------------------- */
const NODE_ENV = process.env.NODE_ENV || "development";
const IS_DEV_MODEL = NODE_ENV == "development" ? 1 : 0;
const WORKSPACE_FOLDER = path.resolve(__dirname, "../../");
const OUT_PUT_DIR = "dist";
const OUT_PUT_PATH = path.resolve(__dirname, "../../" + OUT_PUT_DIR + "/");
const USE_HASH_NAME = true;
const PUBLIC_PATH = IS_DEV_MODEL ? "/" : "/";
const PROJECT_NAME = "single-project-webpack-dev";

module.exports = {
    NODE_ENV,
    PROJECT_NAME,
    WORKSPACE_FOLDER,
    USE_HASH_NAME,
    OUT_PUT_DIR,
    PUBLIC_PATH,
    IS_DEV_MODEL,
    OUT_PUT_PATH,
};
