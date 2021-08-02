/*
 * @Description: 静态资源管理
 * @Author: F-Stone
 * @Date: 2021-08-02 14:04:01
 * @LastEditTime: 2021-08-02 14:04:01
 * @LastEditors: F-Stone
 */

/* ---------------------------------- */
/*            node modules            */
/* ---------------------------------- */
const path = require("path");

/* ---------------------------------- */
/*             npm modules            */
/* ---------------------------------- */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/* ---------------------------------- */
/*            env variable            */
/* ---------------------------------- */
const { WORKSPACE_FOLDER, IS_DEV_MODEL } = require("./webpack.env");
const { pathManage } = require("./webpack.path");

const genFileLoaderConfig = function ({ path, name }) {
    return {
        loader: "file-loader",
        options: {
            name: name,
            outputPath: path,
        },
    };
};
const cssDealRules = IS_DEV_MODEL
    ? [
          "style-loader",
          "css-loader",
          {
              loader: "resolve-url-loader",
              options: {},
          },
      ]
    : [
          {
              loader: MiniCssExtractPlugin.loader,
              options: {
                  publicPath: "../",
              },
          },
          "css-loader",
          {
              loader: "resolve-url-loader",
              options: {},
          },
      ];

module.exports = {
    ejs: {
        test: /\.ejs$/,
        use: [
            {
                loader: "ejs-compiled-loader",
                options: {
                    beautify: true,
                    htmlmin: true,
                    htmlminOptions: {
                        removeComments: true,
                    },
                },
            },
        ],
    },
    fonts: {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 4096,
                    fallback: genFileLoaderConfig(pathManage.fonts),
                },
            },
        ],
    },
    media: {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 4096,
                    fallback: genFileLoaderConfig(pathManage.media),
                },
            },
        ],
    },
    svg: {
        test: /\.(svg)(\?.*)?$/,
        use: [genFileLoaderConfig(pathManage.image)],
    },
    images: {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 4096,
                    fallback: genFileLoaderConfig(pathManage.image),
                },
            },
        ],
    },
    css: {
        test: /\.css$/,
        use: [...cssDealRules, { loader: "postcss-loader" }],
    },
    scss: {
        test: /\.s[ac]ss$/i,
        use: [
            ...cssDealRules,
            { loader: "postcss-loader" },
            {
                loader: "sass-loader",
                options: {
                    implementation: require("sass"),
                    webpackImporter: true,
                    sassOptions: {
                        fiber: require("fibers"),
                    },
                    additionalData:
                        "@import '@/style/mixin.scss';" +
                        "@import '@/style/var.scss';",
                },
            },
        ],
    },
    dllScss: {
        test: /\.s[ac]ss$/i,
        use: [
            ...cssDealRules,
            { loader: "postcss-loader" },
            {
                loader: "sass-loader",
                options: {
                    implementation: require("sass"),
                    webpackImporter: true,
                    sassOptions: {
                        fiber: require("fibers"),
                    },
                },
            },
        ],
    },
    js: {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "cache-loader",
                options: {
                    cacheDirectory: path.resolve(
                        WORKSPACE_FOLDER,
                        "node_modules/.cache/babel-loader"
                    ),
                    cacheIdentifier: "42ec4c7a",
                },
            },
            {
                loader: "thread-loader",
                options: {
                    workers: require("os").cpus().length - 1,
                    poolTimeout: Infinity,
                },
            },
            {
                loader: "babel-loader",
            },
        ],
    },
    ts: {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "cache-loader",
                options: {
                    cacheDirectory: path.resolve(
                        WORKSPACE_FOLDER,
                        "node_modules/.cache/babel-loader"
                    ),
                    cacheIdentifier: "28fc2926",
                },
            },
            {
                loader: "thread-loader",
                options: {
                    workers: require("os").cpus().length - 1,
                    poolTimeout: Infinity,
                },
            },
            {
                loader: "babel-loader",
            },
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    happyPackMode: true,
                },
            },
        ],
    },
    eslint: {
        enforce: "pre",
        test: /\.((j|t)sx?)$/,
        exclude: [/node_modules/],
        use: [
            {
                loader: "eslint-loader",
                options: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                    cache: true,
                    cacheIdentifier: "30641bcb",
                    emitWarning: false,
                    emitError: true,
                },
            },
        ],
    },
    jqueryExport: {
        test: /jquery/,
        loader: "expose-loader",
        options: {
            exposes: {
                globalName: "$",
                override: true,
            },
        },
    },
};
