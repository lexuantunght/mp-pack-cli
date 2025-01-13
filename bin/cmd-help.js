exports.exec = () => {
  console.log("Available commands:\n---------------------------\n");
  console.log("new <app name>");
  console.log("build <path of entry file, default is index.html>");
  console.log("build:ssr <path of entry file");
  console.log("dev <path of entry file, default is index.html>");
  console.log("dev:ssr <path of entry file>");
  console.log("lang --i=<input csv path> --o=<output dir>");
  console.log("icon --i=<input svg path> --o=<output dir>");
  console.log("copy <source> <destination>");
};
