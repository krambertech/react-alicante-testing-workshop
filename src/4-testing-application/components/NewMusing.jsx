import { useState } from "react";

import api from "../api";
import useAsync from "../hooks/useAsync";
import useRandomMusing from "../hooks/useRandomMusing";

import "./NewMusing.css";

export default function NewMusing({ onCreated }) {
  const [text, setText] = useState("");
  const createMusing = useAsync(api.createMusing);
  const [placeholder, resetPlaceholder] = useRandomMusing();

  const handleCreateMusing = async (e) => {
    e.preventDefault();

    const { error, data } = await createMusing.run({
      text: text || placeholder,
    });

    if (!error && data) {
      onCreated(data[0]);
      setText("");
      resetPlaceholder();
    }
  };

  return (
    <form className="NewMusing" onSubmit={handleCreateMusing}>
      <label htmlFor="text">
        💭 Write something...
        <textarea
          autoFocus
          id="text"
          value={text}
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <div className="NewMusing-buttons">
        <button type="submit">
          {createMusing.isPending ? "Saving..." : "Save"}
        </button>
      </div>
      {createMusing.error ? (
        <p role="alert">{createMusing.error.message}</p>
      ) : null}
    </form>
  );
}
