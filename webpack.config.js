function scriptRules() {
  return [
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{ loader: "babel-loader" }],
    },
  ];
}

module.exports = {
  entry: {
    home: "./resources/scripts/home.js",
    quiz: "./resources/scripts/quiz.js",
    highscores: "./resources/scripts/highscores.js",
  },
  output: {
    path: __dirname + "/public/js",
    filename: "[name].js",
  },
  module: {
    rules: scriptRules(),
  },
};
