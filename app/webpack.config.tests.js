var path = require("path");

module.exports = {
    mode: "development",
    entry: "./tests/Tests.fs.js",
    output: {
        path: path.join(__dirname, "./tests/public"),
        filename: "test-bundle.js",
    },
    devServer: {
        contentBase: "./tests/public",
        port: 8080,
    },
}