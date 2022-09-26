// Returns random quote from REST API
//
// EXAMPLE:
// {
//   _id: "HBLejCmmWoIy",
//   author: "Dalai Lama",
//   content: "Happiness mainly comes from our own attitude, rather than from external factors.",
//   length: 80,
//   tags: ["famous-quotes"],
//   dateAdded: "2020-01-01",
//   dateModified: "2020-01-01"
// }

export async function fetchRandomQuote({ category }) {
  const response = await fetch(
    `https://api.quotable.io/random?tags=${category || ""}`
  );
  const json = await response.json();
  return json;
}
