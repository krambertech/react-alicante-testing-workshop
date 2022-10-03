// Returns random quote from REST API
//
// Example:
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
  // const response = await (fetch(
  //   `https://api.quotable2.io/random?tags=${category || ""}`
  // ).catch(handleError));

  // if (response.ok) {
  //   return await response.json();
  // }
  const response = await fetch(
    `https://api.quotable2.io/random?tags=${category || ""}`
  )


  return await response.json();
}


// var handleError = function (err) {
//   console.warn(err);
//   return new Response(JSON.stringify({
//     error: 'Error'
//   }));
// };
