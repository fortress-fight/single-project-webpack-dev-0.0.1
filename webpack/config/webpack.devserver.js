/*
 * @Description: 本地服务
 * @Author: F-Stone
 * @Date: 2021-08-02 17:10:45
 * @LastEditTime: 2021-08-02 17:10:45
 * @LastEditors: F-Stone
 */

/* ---------------------------------- */
/*             npm modules            */
/* ---------------------------------- */
const path = require("path");

/* ---------------------------------- */
/*            node modules            */
/* ---------------------------------- */
const chalk = require("chalk");
const chokidar = require("chokidar");

/* ---------------------------------- */
/*               set env              */
/* ---------------------------------- */
const {
    PUBLIC_PATH,
    WORKSPACE_FOLDER,
    DEVICE,
} = require("../config/webpack.env");

/* ---------------------------------- */
/*           register tools           */
/* ---------------------------------- */
const { ip } = require("../helper/get-network-ip");

const useHttps = false;
exports.WEBPACK_SERVER_CONFIG = {
    host: ip,
    port: 9000,
    open: true,
    hot: true,
    https: useHttps,
    overlay: { warnings: true, errors: true },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: [
            path.resolve(WORKSPACE_FOLDER, "node_modules"),
            path.resolve(WORKSPACE_FOLDER, "dist"),
        ],
    },
    quiet: true,
    compress: true,
    disableHostCheck: true,
    publicPath: PUBLIC_PATH,
    openPage: "",
    proxy: {
        "/api/": {
            target: "http://127.0.0.1:3000",
            /* target是域名的话，需要这个参数， */
            changeOrigin: true,
        },
    },
    // 告诉服务器从哪里提供内容, 默认情况下，将使用当前工作目录作为提供内容的目录
    before(app, server) {
        const files = [path.resolve(WORKSPACE_FOLDER, `src/${DEVICE}/pages`)];
        chokidar.watch(files).on("all", () => {
            setTimeout(() => {
                server.sockWrite(server.sockets, "content-changed");
            }, 1000);
        });
    },
    after() {
        console.log();
        chalk.yellow(
            ` Access the dev server via ${chalk.cyan(
                `${useHttps ? "https" : "http"}://${ip}:${this.port}`
            )}`
        );
        console.log();
    },
};
