import { useEffect } from "react";

const inputs = ["INPUT", "SELECT", "TEXTAREA"];

const useHotKey = (key, callback) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key && !inputs.includes(e.target.tagName)) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [key, callback]);
};

export default useHotKey;
