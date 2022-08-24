import { ApiError, Session, User } from "@supabase/supabase-js";
import React, { useContext, useEffect, useState } from "react";
import supabase from "utils/supabase";

interface AuthContextInterface {
  user: User | null;
  session: Session | null;
  authError: ApiError | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
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
    const data = await supabase.auth.signIn({ email, password });
    setUser(data.user);
    setSession(data.session);
    setAuthError(data.error);
  };

  const signOut = async () => {
    const data = await supabase.auth.signOut();
    console.log("signed out");
    setUser(null);
    setSession(null);
    setAuthError(data.error);
  };

  const signUp = async (email: string, password: string) => {
    const data = await supabase.auth.signUp({ email, password });
    setUser(data.user);
    setSession(data.session);
    setAuthError(data.error);
  };

  const authContext: AuthContextInterface = {
    user,
    session,
    authError,
    signIn,
    signOut,
    signUp,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default useAuth;
