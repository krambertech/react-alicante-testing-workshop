// This out little implementation of testing framework,
// which we wrote for understanding how it works

const expect = (result) => ({
  toBe(expected) {
    if (result !== expected) {
      throw new Error(`${result} expected to be ${expected}`);
    }
  },
});

let passed = 0;
let failed = 0;

const test = (name, cb) => {
  try {
    cb();
    console.log("✅", name);
    passed++;
  } catch (err) {
    console.log("⛔️", err.message);
    failed++;
  }
};

const describe = (name, cb) => {
  passed = 0;
  failed = 0;

  console.group(`👉 ${name}`);
  cb();
  console.log(`${passed} passed, ${failed} failed, ${passed + failed} total`);
  console.groupEnd(`👉 ${name}`);
};

module.exports = { test, expect, describe };
