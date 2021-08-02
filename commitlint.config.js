/*
 * @Description: commitlint
 * @Author: F-Stone
 * @Date: 2021-08-02 11:35:33
 * @LastEditTime: 2021-08-02 11:35:34
 * @LastEditors: F-Stone
 */
module.exports = {
    extends: ["@commitlint/config-angular"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feature",
                "build",
                "update",
                "docs",
                "fix",
                "style",
                "refactor",
                "perf",
                "test",
                "chore",
                "merge",
                "revert",
                "WIP",
            ],
        ],
    },
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w+)\((.+)\).*:\s*(.*)\s*$/,
            headerCorrespondence: ["type", "scope", "subject"],
        },
    },
};
