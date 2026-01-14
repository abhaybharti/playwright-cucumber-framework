module.exports = {
  default:
    `--require-module ts-node/register ` +
    `--require src/test/steps/**/*.ts ` +
    `--require src/test/support/hooks.ts ` +
    `--format progress `,
};
