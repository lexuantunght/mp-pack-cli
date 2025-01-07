const error = (...args) => {
  console.error("[mp-pack-cli]", ...args);
};

const warn = (...args) => {
  console.warn("[mp-pack-cli]", ...args);
};

const info = (...args) => {
  console.info("[mp-pack-cli]", ...args);
};

module.exports = { error, warn, info };
