import { useState } from "react";
import Modal, { useModal } from "../components/Modal";
import { useAuth } from "../context/AuthContext";

import "./Login.css";

const LoginForm = ({ submitButtonLabel, onSubmit }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;
    const { error } = await onSubmit({
      email: email.value,
      password: password.value,
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form className="Login-form" onSubmit={handleSubmit}>
      <label>
        Email
        <input id="email" type="email" />
      </label>

      <label>
        Password
        <input id="password" type="password" />
      </label>

      {errorMessage ? <p role="alert">⛔️ {errorMessage} </p> : null}

      <button type="submit">{submitButtonLabel}</button>
    </form>
  );
};

export default function Login() {
  const { signUp, signIn } = useAuth();
  const logInModal = useModal();
  const signUpModal = useModal();

  return (
    <div className="Login">
      <h3>🔐 You need to log in</h3>

      <div>
        <button onClick={logInModal.open}>Log in</button>
        <button onClick={signUpModal.open}>Sign up</button>
      </div>

      <Modal open={logInModal.isOpen} title="Log in" onClose={logInModal.close}>
        <LoginForm submitButtonLabel="Log in" onSubmit={signIn} />
      </Modal>

      <Modal
        open={signUpModal.isOpen}
        title="Sign up"
        onClose={signUpModal.close}
      >
        <LoginForm submitButtonLabel="Create account" onSubmit={signUp} />
      </Modal>
    </div>
  );
}
