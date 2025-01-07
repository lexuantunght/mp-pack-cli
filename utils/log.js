const error = (...args) => {
  console.error("[WP-CLI]", ...args);
};

const warn = (...args) => {
  console.warn("[WP-CLI]", ...args);
};

const info = (...args) => {
  console.info("[WP-CLI]", ...args);
};

module.exports = { error, warn, info };
