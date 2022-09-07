/**
 * Multiplies 2 numbers
 *
 * Example:
 *   2, 4 -> 8
 *   10, 5 -> 50
 * 
 * It throws error if input is invalid
 */

function multiply(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error("Invalid input: both values need to be numbers")
  }

  return a * b;
}

export default multiply;
