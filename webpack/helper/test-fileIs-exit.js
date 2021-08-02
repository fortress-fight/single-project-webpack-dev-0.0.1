/*
 * @Description: 验证文件是否存在
 * @Author: ff-stone
 * @Date: 2021-04-14 14:52:20
 * @LastEditTime: 2021-04-14 15:01:04
 * @LastEditors: ff-stone
 */

const fs = require("fs");

/**
 *测试文件是否存在
 *
 * @param {*} path 文件目录
 * @param {*} [mode=fs.constants.F_OK | fs.constants.W_OK]
 * @return {*}
 */
exports.testFileIsExit = (path, mode = fs.constants.F_OK) => {
    return new Promise((res, rej) => {
        fs.access(path, mode, (err) => {
            if (err) {
                rej({
                    code: 1,
                    data: {
                        err,
                        param: { path, mode },
                    },
                    msg: "不存在",
                });
            }

            res({
                code: 0,
                data: {
                    exit: 0,
                    param: { path, mode },
                },
                msg: "",
            });
        });
    });
};
