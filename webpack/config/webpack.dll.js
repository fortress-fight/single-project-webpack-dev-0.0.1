/*
 * @Description: webpack 使用 dll
 * @Author: F-Stone
 * @Date: 2021-08-02 15:55:00
 * @LastEditTime: 2021-08-02 15:55:00
 * @LastEditors: F-Stone
 */

/* ---------------------------------- */
/*            node modules            */
/* ---------------------------------- */
const path = require("path");
const fs = require("fs");

/* ---------------------------------- */
/*             npm modules            */
/* ---------------------------------- */
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

/* ---------------------------------- */
/*               set env              */
/* ---------------------------------- */
const { PUBLIC_PATH, WORKSPACE_FOLDER } = require("../config/webpack.env");

function collectDLL() {
    const dir = path.resolve(WORKSPACE_FOLDER, "dll");
    const dirCont = fs.readdirSync(dir);
    return dirCont
        .filter((e) => e.match(/.*\.json$/gi))
        .map((f) => {
            return new webpack.DllReferencePlugin({
                manifest: require(path.resolve(dir, f)),
            });
        });
}

exports.DLL_PLUGIN = [
    ...collectDLL(),
    new AddAssetHtmlPlugin([
        {
            filepath: path.resolve(WORKSPACE_FOLDER, "dll/script/*.dll.js"),
            publicPath: PUBLIC_PATH + "script/",
            outputPath: "script/",
        },
        {
            filepath: path.resolve(WORKSPACE_FOLDER, "dll/css/*.dll.css"),
            publicPath: PUBLIC_PATH + "css/",
            outputPath: "css/",
            typeOfAsset: "css",
        },
    ]),
];
