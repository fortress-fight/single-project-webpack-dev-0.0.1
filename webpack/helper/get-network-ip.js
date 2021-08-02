/*
 * @Description: 输出本机 IP 地址
 * @Author: Fu Fei
 * @Date: 2021-04-23 11:39:19
 * @LastEditTime: 2021-04-23 11:39:19
 * @LastEditors: Fu Fei
 * @FilePath: \emit\webpack\helper\get-network-ip.ts
 */

const ip = require("ip").address();

exports.ip = ip || "localhost";
