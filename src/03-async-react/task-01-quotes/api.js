export async function fetchRandomQuote({ category }) {
  const response = await fetch(
    `https://api.quotable.io/random?tags=${category || ""}`
  );
  const json = await response.json();
  return json;
}
