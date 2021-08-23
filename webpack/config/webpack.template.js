/*
 * @Description: 生成 html 模板配置
 * @Author: F-Stone
 * @Date: 2021-08-02 16:03:21
 * @LastEditTime: 2021-08-02 16:03:22
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
const HtmlWebpackPlugin = require("html-webpack-plugin");

/* ---------------------------------- */
/*               set env              */
/* ---------------------------------- */
const {
    PUBLIC_PATH,
    WORKSPACE_FOLDER,
    DEVICE,
} = require("../config/webpack.env");

/* ---------------------------------- */
/*            require tools           */
/* ---------------------------------- */
// 创建 HTML 文件
const { testFileIsExit } = require("../helper/test-fileIs-exit");
const { createFile } = require("../helper/create-file");

function genHTMLConfig(name, config = {}) {
    let templatePath = path.resolve(
        WORKSPACE_FOLDER,
        `src/${DEVICE}/pages/${name}.ejs`
    );
    testFileIsExit(templatePath).then(
        () => {},
        () => {
            return createFile(templatePath, "")
                .then()
                .catch((err) => {
                    console.log("err:", err);
                });
        }
    );
    return {
        name,
        config: Object.assign(
            {
                title: name,
                minify: {
                    collapseWhitespace: true,
                    keepClosingSlash: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                    preserveLineBreaks: true,
                },
                templateParameters: {
                    publicPath: PUBLIC_PATH,
                },
                template: templatePath,
                chunks: "all",
                excludeChunks: [],
                filename: name + ".html",
                beautify: {
                    "indent-size": 4,
                },
            },
            config
        ),
    };
}

exports.genHTMLPlugin = function getHtmlPlugin() {
    let pagesConfig = {};
    let usePages = [];
    try {
        let pageConfigPath = path.resolve(
            WORKSPACE_FOLDER,
            "webpack/config/webpack.pages.config.js"
        );
        fs.accessSync(pageConfigPath, fs.constants.F_OK);
        const { pages } = require(pageConfigPath);
        usePages = pages;
    } catch (error) {
        usePages = ["index"];
    }
    usePages.map((page) => {
        const { name, config } = genHTMLConfig(page.name, page.config);
        pagesConfig[name] = config;
    });

    return Object.values(pagesConfig).map(function (page) {
        return new HtmlWebpackPlugin(page);
    });
};
