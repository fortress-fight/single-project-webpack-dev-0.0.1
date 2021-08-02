/*
 * @Description: postcss 的配置文件
 * @Author: F-Stone
 * @Date: 2021-08-02 13:42:42
 * @LastEditTime: 2021-08-02 13:42:43
 * @LastEditors: F-Stone
 */

// Automatically append content property for viewport-units-buggyfill.
// viewport-units-buggyfill [https://github.com/rodneyrehm/viewport-units-buggyfill]
/*
 * 使用 "postcss-viewport-units" 需要注意
 * viewport-units-buggyfill 的补充，将会对图片产生意外的影响，可以使用
 * img { content: normal !important; } 来解决问题
 */

const defaultPlugins = [
    require("postcss-sass-unicode"),
    require("postcss-preset-env")({ stage: 0 }),
    require("postcss-custom-properties"),
    require("postcss-aspect-ratio-mini"),
];
if (process.env.NODE_ENV == "production") {
    defaultPlugins.push(
        require("cssnano")({
            preset: [
                "default",
                {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        })
    );
}
module.exports = (api) => {
    if (
        /\\style-mobile\\.*\.s[ac]ss$/.test(api.file) ||
        /\\style-mobile\\.*\.css$/.test(api.file)
    ) {
        return {
            plugins: [
                ...defaultPlugins,
                require("postcss-write-svg")({
                    uft8: false,
                }),
                require("postcss-px-to-viewport")({
                    viewportWidth: 750,
                    viewportHeight: 2416,
                    // px to vw无法整除时，保留几位小数
                    unitPrecision: 3,
                    viewportUnit: "vw",
                    selectorBlackList: [".ignore", ".hairlines"],
                    // 小于1px不转换
                    minPixelValue: 1,
                    // 允许媒体查询中转换
                    mediaQuery: true,
                    exclude: undefined,
                    include: undefined,
                }),
                require("postcss-viewport-units")({
                    filterRule: (rule) =>
                        rule.nodes.findIndex((i) => i.prop === "content") ===
                        -1,
                }),
            ],
        };
    }
    if (
        /\\style-pad\\.*\.s[ac]ss$/.test(api.file) ||
        /\\style-pad\\.*\.css$/.test(api.file)
    ) {
        return {
            plugins: [
                ...defaultPlugins,
                require("postcss-write-svg")({
                    uft8: false,
                }),
                require("postcss-px-to-viewport")({
                    viewportWidth: 1024,
                    viewportHeight: 2416,
                    // px to vw无法整除时，保留几位小数
                    unitPrecision: 3,
                    viewportUnit: "vw",
                    selectorBlackList: [".ignore", ".hairlines"],
                    // 小于1px不转换
                    minPixelValue: 1,
                    // 允许媒体查询中转换
                    mediaQuery: true,
                    exclude: undefined,
                    include: undefined,
                }),
                require("postcss-viewport-units")({
                    filterRule: (rule) =>
                        rule.nodes.findIndex((i) => i.prop === "content") ===
                        -1,
                }),
            ],
        };
    }
    return {
        plugins: defaultPlugins,
    };
};
