import React from "react";
import useHotKey from "../hooks/useHotKey";

import "./Modal.css";

function Modal({ title, children, open, onClose }) {
  useHotKey("Escape", () => onClose?.());

  if (!open) {
    return null;
  }

  return (
    <div className="Modal">
      <div role="dialog" className="Modal-content">
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            className="Modal-close"
            onClick={onClose}
          >
            ✖︎
          </button>
        )}
        <h3 className="Modal-title">{title}</h3>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Modal;
