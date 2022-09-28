const sum = (...numbers) => {
  return numbers.reduce(
    (result, number) =>
      result + (Array.isArray(number) ? sum(...number) : number),
    0
  );
};

module.exports = sum;
