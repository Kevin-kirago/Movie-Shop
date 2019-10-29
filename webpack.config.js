const path = require("path");
const htmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: ["babel-polyfill", "./src/js/index.js", "./src/sass/main.scss"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/bundle.js"
	},
	devServer: {
		contentBase: "./dist"
	},
	plugins: [
		new htmlWebPackPlugin({
			filename: "index.html",
			template: "./src/index.html"
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: "file-loader",
						options: { name: "css/style.css" }
					},
					{
						loader: "extract-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "sass-loader"
					}
				]
			}
		]
	}
};
