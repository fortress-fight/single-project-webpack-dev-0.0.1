/*
 * @Description: 多页面的配置信息
 * @Author: F-Stone
 * @Date: 2021-08-02 16:03:44
 * @LastEditTime: 2021-08-02 16:03:44
 * @LastEditors: F-Stone
 */

const { PUBLIC_PATH, PROJECT_NAME } = require("./webpack.env");
const genTempParam = (config) =>
    Object.assign(
        {
            PROJECT_NAME,
            PUB_PATH: PUBLIC_PATH,
            IMG_PATH: PUBLIC_PATH + "image/",
            process,
        },
        config
    );

exports.pages = [
    {
        name: "index",
        config: {
            templateParameters: genTempParam({
                testData: "这是一条测试文字",
            }),
        },
    },
    {
        name: "test",
        config: {
            templateParameters: genTempParam({
                testData: "这是一条测试文字",
            }),
        },
    },
];
