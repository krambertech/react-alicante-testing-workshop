import { useState } from "react";
import { logIn } from "./api";

export default function Login() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("none");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    await logIn({ password });
    setStatus("success");

    setPassword("");
  };

  return (
    <div>
      <h3>Log in</h3>
      {status === "success" ? (
        <h1>✨ Welcome! You are logged in! ✨</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
          <button type="submit" disabled={!password}>
            🔒 Log in
          </button>
          {status === "loading" ? <p role="status">Logging in...</p> : null}
        </form>
      )}
    </div>
  );
}
