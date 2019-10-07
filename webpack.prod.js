
const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


const setMPA = () => {
  const entry = {};

  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];

      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template: path.join(entryFile, `../${pageName}.html`),
        filename: `${pageName}.html`,
        chunks: [`${pageName}`],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }));
    });


  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve("src"),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },

          "eslint-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: [
                    'last 2 version',
                    '>1%',
                  ],
                }),
              ],
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new OptimizeCssAssetsPlugin({
      assertNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    new CleanWebpackPlugin(),
    ...htmlWebpackPlugins,
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require("./build/library/library.json"),
    }),
    new HardSourceWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
      }),
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js"),
    },
    extensions: [".js"],
    mainFields: ["main"],
  },
};
