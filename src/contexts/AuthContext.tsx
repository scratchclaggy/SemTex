import { ApiError, Session, User } from "@supabase/supabase-js";
import React, { useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface AuthContextInterface {
  user: User | null;
  session: Session | null;
  authError: ApiError | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
  setUserMetadata: (data: object) => void;
}

const AuthContext = React.createContext<AuthContextInterface | null>(null);

const useAuth = () => useContext(AuthContext) as AuthContextInterface;

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authError, setAuthError] = useState<ApiError | null>(null);

  useEffect(() => {
    setUser(supabase.auth.user());
    setSession(supabase.auth.session());
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await supabase.auth.signIn({ email, password });
    setUser(res.user);
    setSession(res.session);
    setAuthError(res.error);
  };

  const signOut = async () => {
    const res = await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setAuthError(res.error);
  };

  const signUp = async (email: string, password: string) => {
    const res = await supabase.auth.signUp({ email, password });
    setUser(res.user);
    setSession(res.session);
    setAuthError(res.error);
  };

  const setUserMetadata = async (data: object) => {
    const res = await supabase.auth.update({ data });
    setUser(res.user);
    setAuthError(res.error);
  };

  const authContext: AuthContextInterface = {
    user,
    session,
    authError,
    signIn,
    signOut,
    signUp,
    setUserMetadata,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default useAuth;
