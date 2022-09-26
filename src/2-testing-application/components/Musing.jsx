import formatDate from "../helpers/formatDate";

import "./Musing.css";

export default function Musing({ id, text, createdAt, onDelete }) {
  return (
    <div className="Musing" data-testid="musing">
      <p>{text}</p>
      <span className="Musing-time">{formatDate(createdAt)}</span>
      <button
        className="Musing-delete"
        aria-label="Delete"
        onClick={() => onDelete(id)}
      >
        ✖︎
      </button>
    </div>
  );
}
