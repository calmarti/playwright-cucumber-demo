const common = `
  --require  setup/world.js
  --require setup/hooks.js
  --require step-definitions/**/*.js
  --format progress'                 
  `;

module.exports = {
  default: common
};