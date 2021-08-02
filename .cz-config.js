/*
 * @Description: git commit format
 * @Author: F-Stone
 * @Date: 2021-08-02 11:37:05
 * @LastEditTime: 2021-08-02 11:37:06
 * @LastEditors: F-Stone
 */
"use strict";

module.exports = {
    types: [{
            value: "feature",
            name: "feature: A new feature"
        },
        {
            value: "update",
            name: "update: Update some files"
        },
        {
            value: "fix",
            name: "fix: A bug fix"
        },
        {
            value: "style",
            name: "style: Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)"
        },
        {
            value: "refactor",
            name: "refactor: A code change that neither fixes a bug nor adds a feature"
        },
        {
            value: "test",
            name: "test: Adding missing tests"
        },
        {
            value: "revert",
            name: "revert: Revert to a commit"
        },
        {
            value: "WIP",
            name: "WIP: Work in progress"
        },
        {
            value: "merge",
            name: "merge: Make a merge"
        },
        {
            value: "chore",
            name: "chore: Changes to the build process or auxiliary tools\n            and libraries such as documentation generation"
        },
        {
            value: "docs",
            name: "docs: Documentation only changes"
        },
        {
            value: "build",
            name: "build: Make a build"
        },
        {
            value: "perf",
            name: "perf: A code change that improves performance"
        }
    ],
    allowTicketNumber: false,
    isTicketNumberRequired: false,
    ticketNumberPrefix: "TICKET-",
    ticketNumberRegExp: "\\d{1,5}",
    messages: {
        type: "Select the type of change that you're committing:",
        scope: "\nDenote the SCOPE of this change (optional):",
        customScope: "Denote the SCOPE of this change:",
        subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
        body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
        breaking: "List any BREAKING CHANGES (optional):\n",
        footer: "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
        confirmCommit: "Are you sure you want to proceed with the commit above?"
    },

    allowCustomScopes: true,
    allowBreakingChanges: ["feature", "fix"],
    skipQuestions: [],
    subjectLimit: 100
};
