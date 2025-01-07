const fs = require("fs");
const argv = require("optimist").argv;
const Logger = require("../utils/log");

const INP_DIR = argv.i; //'src/web/static/lang/lang_pomodoro.csv';
const OUT_DIR = argv.o; //'src/web/static/locales';
const isClean = argv.clean;

csv = fs.readFileSync(INP_DIR);

// Convert the data to String and
// split it in an array
var array = csv.toString().split("\n");

// The array[0] contains all the
// header columns so we store them
// in headers array
let headers = array[0].split(";");

const writeOut = (locale, out) => {
  return new Promise((resolve) => {
    if (!fs.existsSync(OUT_DIR)) {
      fs.mkdirSync(OUT_DIR);
    }
    fs.writeFile(`${OUT_DIR}/${locale}.lang.json`, JSON.stringify(out), () => {
      Logger.info("Generated locale " + locale);
      resolve();
    });
  });
};

(async () => {
  if (isClean && fs.existsSync(OUT_DIR)) {
    fs.rmdirSync(OUT_DIR, { recursive: true, force: true });
  }
  for (let i = 1; i < headers.length; i++) {
    let out = {};
    for (let j = 1; j < array.length; j++) {
      const s = array[j].trim().split(";");
      out[s[0]] = s[i];
    }
    await writeOut(headers[i].trim(), out);
  }
})();
