exports.exec = async () => {
  const argv = require("optimist").argv;
  const path = require("path");
  const fs = require("fs");

  const templateFolder = path.join(__dirname, `../template/proj`);
  const appName = argv["_"][1];
  const outDir = path.join(process.cwd(), appName);

  const ncp = require("ncp");
  const { exec } = require("child_process");

  const runAsPromise = (fn, ...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  console.log("Creating app from template");

  await runAsPromise(ncp, templateFolder, outDir);
  const editFiles = ["package.json", "index.html"];
  for (const editFile of editFiles) {
    const editFilePath = path.join(outDir, editFile);
    const data = await runAsPromise(fs.readFile, editFilePath, "utf-8");
    await runAsPromise(
      fs.writeFile,
      editFilePath,
      data.replace(/<%=appName%>/g, appName),
      "utf-8"
    );
  }

  console.log("Installing dependencies");
  await runAsPromise(exec, `cd ${outDir} && npm install`);

  console.log("Success create app at", outDir);
};
