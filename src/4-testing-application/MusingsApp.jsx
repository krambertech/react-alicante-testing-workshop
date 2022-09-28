import { useAuth } from "./context/AuthContext";

import Login from "./screens/Login";
import MyMusings from "./screens/MyMusings";

import "./MusingsApp.css";

function MusingsApp() {
  const { user, signOut } = useAuth();

  return (
    <div className="MusingsApp">
      <header className="MusingsApp-header">
        <h2>🧠 Musings</h2>
        {user ? (
          <div>
            🔐{user.email}
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : null}
      </header>

      {user ? <MyMusings /> : <Login />}
    </div>
  );
}

export default MusingsApp;
