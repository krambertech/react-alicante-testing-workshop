import React from "react";
import { AuthProvider } from "./context/AuthContext";
import MusingsApp from "./MusingsApp";

function Root() {
  return (
    <AuthProvider>
      <MusingsApp />
    </AuthProvider>
  );
}

export default Root;
