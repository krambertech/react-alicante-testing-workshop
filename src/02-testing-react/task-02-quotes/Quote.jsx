import { useState } from "react";
import { fetchRandomQuote } from "./api";

const categories = [
  "any",
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
      <h3>Random quote</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="quoteCategory">Choose category</label>
        <select
          id="quoteCategory"
          value={quoteCategory}
          onChange={handleQuoteCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit">✨ Generate a random quote</button>
      </form>

      {quote && (
        <div>
          <blockquote>{quote.content}</blockquote>
          <cite>(c) by {quote.author}</cite>
        </div>
      )}
    </div>
  );
}

export default Quote;
