import React, { useState } from "react";
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

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};
