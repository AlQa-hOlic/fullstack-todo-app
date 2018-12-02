const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = env => {
  return {
    entry: path.resolve(__dirname, "src", "index.js"),
    mode: env.mode,
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "minify"],
              plugins: []
            }
          }
        },
        {
          test: /.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [require("autoprefixer")]
              }
            }
          ]
        },
        {
          test: /.scss/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 2
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [require("autoprefixer")]
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/bundle.css"
      }),
      new HTMLWebpackPlugin({
        template: "src/index.html"
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 9000
    },
    output: {
      filename: "js/bundle.js",
      path: path.resolve(__dirname, "public")
    }
  };
};
