import React from "react";

const MIN_LENGTH = 3;
const MAX_LENGTH = 9;

class WordChecker extends React.Component {
  state = {
    word: "",
  };

  handleChange = (e) => {
    this.setState({ word: e.target.value });
  };

  render() {
    const { word } = this.state;

    return (
      <div>
        <h3>Check the word</h3>
        <label htmlFor="word">Enter a word</label>
        <input
          id="word"
          value={word}
          placeholder="Word"
          //onFocus={() => console.log("focus")}
          onChange={this.handleChange}
        />
        {word.length <= MAX_LENGTH && word.length >= MIN_LENGTH ? (
          <p role="alert">👌 Good word!</p>
        ) : (
          <p role="alert">🚫 Bad word!</p>
        )}
      </div>
    );
  }
}

export default WordChecker;
