exports.exec = () => {
  console.log("Available commands:\n---------------------------\n");
  console.log("build --entry=<path of entry file, default is index.html>");
  console.log("dev --entry=<path of entry file, default is index.html>");
  console.log("lang --i=<input csv path> --o=<output dir>");
  console.log("icon --i=<input svg path> --o=<output dir>");
};
