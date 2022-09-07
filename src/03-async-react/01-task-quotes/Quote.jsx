import { useState } from "react";
import { fetchRandomQuote } from "./api";

const categories = [
  "all",
  "famous-quotes",
  "history",
  "technology",
  "sports",
  "inspirational",
];

function Quote() {
  const [quoteCategory, setQuoteCategory] = useState("");
  const [quote, setQuote] = useState(null);

  const handleQuoteCategory = (e) => {
    setQuoteCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quote = await fetchRandomQuote({
      category: quoteCategory === "all" ? null : quoteCategory,
    });
    setQuote(quote);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="quoteCategory">Cat says</label>
        <select
          id="quoteCategory"
          value={quoteCategory}
          onChange={handleQuoteCategory}
        >
          <option value="all">all categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit">✨ Generate a random quote</button>
      </form>

      {quote ? <q>{quote.content}</q> : null}
    </div>
  );
}

export default Quote;
