/*
 * @Description: eslint config 配合 TS 和 JS 文件
 * @Author: F-Stone
 * @Date: 2021-08-02 12:13:57
 * @LastEditTime: 2021-08-02 12:13:57
 * @LastEditors: F-Stone
 */
module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        parser: "@typescript-eslint/parser",
    },
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    ignorePatterns: ["**/dll/**/*.*", "/dll/**/*.*"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
            },
        ],
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
    overrides: [
        {
            files: ["**/*.js"],
            parser: "babel-eslint",
            parserOptions: {
                ecmaFeatures: {
                    legacyDecorators: true,
                    experimentalObjectRestSpread: true,
                },
            },
            extends: [
                "eslint:recommended",
                "plugin:import/recommended",
                "plugin:prettier/recommended",
            ],
            rules: {
                "no-debugger":
                    process.env.NODE_ENV === "production" ? "warn" : "off",
            },
        },
        {
            files: ["**/*.ts"],
            extends: [
                "eslint:recommended",
                "plugin:import/typescript",
                "plugin:@typescript-eslint/recommended",
                "prettier/@typescript-eslint",
                "plugin:prettier/recommended",
            ],
            parserOptions: {
                parser: "@typescript-eslint/parser",
                ecmaVersion: 2020,
                sourceType: "module",
                ecmaFeatures: {
                    legacyDecorators: true,
                    experimentalObjectRestSpread: true,
                },
            },
            rules: {
                "no-debugger":
                    process.env.NODE_ENV === "production" ? "warn" : "off",
            },
        },
        {
            files: ["**/*.d.ts"],
            parserOptions: {
                parser: "@typescript-eslint/parser",
                ecmaVersion: 2020,
                sourceType: "module",
            },
            rules: {
                "@typescript-eslint/no-explicit-any": 0,
            },
        },
    ],
    globals: {
        $: "readonly",
        jQuery: "readonly",
        ENV: "readonly",
    },
};
