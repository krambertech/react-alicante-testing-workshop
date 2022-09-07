const sum = (...numbers) => {
  return numbers.reduce((result, number) => result + number, 0);
};

module.exports = sum;

