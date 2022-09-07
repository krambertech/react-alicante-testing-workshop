/**
 * This is `toCamelCase` function which transforms string
 * with different separators to camelCase string
 * 
 * Separators it supports: -, _, (space)
 * 
 * Examples:
 *   hello_wOrlD -> helloWorld
 *   hello-world_HELLO -> helloWorldHello
 *   hello WORLd -> helloWorld
 */

export default function toCamelCase(string) {
  return string
    .replace(/^[_.\- ]+/, "")
    .toLowerCase()
    .replace(/[_.\- ]+(\w|$)/g, (_, part) => part.toUpperCase());
};
