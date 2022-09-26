import {
  useEffect,
  useContext,
  createContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import api from "../api";

const LOCAL_STORAGE_KEY = "_auth_";

const AuthContext = createContext({});
AuthContext.displayName = "AuthContext";

function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY);
}

function setToken(token) {
  return window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
}

function clearToken(token) {
  return window.localStorage.setItem(LOCAL_STORAGE_KEY, "");
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const restoreUser = async () => {
      const token = getToken();

      if (token) {
        setLoading(true);

        const { user } = await api.restoreUser(token);
        setUser(user);

        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const signIn = useCallback(
    async ({ email, password }) => {
      const data = await api.signIn({ email, password });
      setUser(data?.user ?? null);
      setToken(data?.session?.access_token);
      return data;
    },
    [setUser]
  );

  const signUp = useCallback(
    async ({ email, password }) => {
      const data = await api.signUp({ email, password });
      setUser(data?.user ?? null);
      setToken(data?.session?.access_token);
      return data;
    },
    [setUser]
  );

  const signOut = useCallback(async () => {
    const data = await api.signOut();
    setUser(null);
    clearToken();

    return data;
  }, [setUser]);

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut }),
    [user, signIn, signUp, signOut]
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
}
