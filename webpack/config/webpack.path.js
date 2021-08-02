/*
 * @Description: webpack 路径管理
 * @Author: F-Stone
 * @Date: 2021-08-02 17:20:44
 * @LastEditTime: 2021-08-02 17:20:44
 * @LastEditors: F-Stone
 */
/* ---------------------------------- */
/*            node modules            */
/* ---------------------------------- */
const path = require("path");

const { USE_HASH_NAME } = require("./webpack.env");

const assetsDir = "";
const assetsName = USE_HASH_NAME
    ? "[name].[contenthash:8].[ext]"
    : "[name].[ext]";
const pureName = USE_HASH_NAME ? "[name].[contenthash:8]" : "[name]";
/* ---------------------------------- */
/*              资源名称               */
/* ---------------------------------- */
// eslint-disable-next-line no-unused-vars
const genAssetSubPath = (dir) => {
    return path.posix.join(assetsDir, `${dir}`);
};

const pathManage = {
    js: {
        dir: "script",
        path: assetsDir + "script",
        name: pureName,
        fullPath: assetsDir + "script/" + pureName + ".js",
    },
    css: {
        dir: "css",
        path: assetsDir + "css",
        name: pureName,
        fullPath: assetsDir + "css/" + pureName + ".css",
    },
    image: {
        dir: "image",
        path: assetsDir + "image",
        name: assetsName,
        fullPath: assetsDir + "image/" + assetsName,
    },
    media: {
        dir: "media",
        path: assetsDir + "media",
        name: assetsName,
        fullPath: assetsDir + "media/" + assetsName,
    },
    fonts: {
        dir: "fonts",
        path: assetsDir + "fonts",
        name: assetsName,
        fullPath: assetsDir + "fonts/" + assetsName,
    },
};

exports.pathManage = pathManage;
exports.getPath = function (type) {
    return pathManage[type] || {};
};
