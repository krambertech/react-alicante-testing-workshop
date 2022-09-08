import { useState } from "react";

function Welcome() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayName(name);
  };

  return (
    <div>
      <h3>Welcome!</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          placeholder="Enter a name"
          onChange={handleChange}
        />
        <button type="submit" disabled={!name}>
          Greet me!
        </button>
      </form>

      {displayName ? <h3>✨ Hello, {displayName}! ✨</h3> : null}
    </div>
  );
}

export default Welcome;
