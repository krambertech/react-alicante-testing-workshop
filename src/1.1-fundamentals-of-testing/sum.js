const sum = (...numbers) => {
  let result = 0;

  for (let i = 0; i < numbers.length; i++) {
    result += numbers[i];
  }

  return result;
};

sum(2, 3); // => 5
sum(2, 3, 4); // => 9

// module.exports = sum;
