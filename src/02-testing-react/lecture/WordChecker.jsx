import { useState } from "react";

function WordChecker({ minLength = 3, maxLength = 7 }) {
  const [word, setWord] = useState("");

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  return (
    <div>
      <label htmlFor="word">Enter a word</label>
      <input id="word" value={word} onChange={handleChange} />
      {word.length <= maxLength && word.length >= minLength ? (
        <p role="status">Good word!</p>
      ) : (
        <p role="alert">
          Bad word!
        </p>
      )}
    </div>
  );
}

export default WordChecker;
