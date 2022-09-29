const sum = (...numbers) => {
  return numbers.reduce((result, number) => result + number, 0);
};

sum(2, 3); // => 5
sum(2, 3, 4); // => 9
