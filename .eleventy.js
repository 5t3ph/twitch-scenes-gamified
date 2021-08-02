module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/img/");

  eleventyConfig.addFilter("printJs", (js) => {
    return JSON.stringify(js);
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
