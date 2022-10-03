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

function QuoteGenerator() {
  const [quoteCategory, setQuoteCategory] = useState("");
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeCategory = (e) => {
    setQuoteCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    try {
      const quote = await fetchRandomQuote({
        category: quoteCategory === "all" ? null : quoteCategory,
      });
      setQuote(quote);
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      <h3>Random quote</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="quoteCategory">Choose category</label>
        <select
          id="quoteCategory"
          value={quoteCategory}
          onChange={handleChangeCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit">✨ Generate a random quote</button>
      </form>

      {isLoading ? (
        <p role="status">🌍 Loading...</p>
      ) : error ? (
        <span role="alert">
          something went wrong
        </span>
      ) : quote ? (
        <blockquote>
          <p>{quote.content}</p>
          <footer>{quote.author}</footer>
        </blockquote>
      ) : null}
    </div>
  );
}

export default QuoteGenerator;
