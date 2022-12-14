import { ApiError, User } from "@supabase/supabase-js";
import React, { useContext, useEffect, useState } from "react";
import supabase from "src/utils/supabase";

interface AuthContextInterface {
  user: User | null;
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
  const [authError, setAuthError] = useState<ApiError | null>(null);

  useEffect(() => {
    setUser(supabase.auth.user());
    setIsLoading(false);
  }, []);

  const updateAdmin = async () => {
    const { data: admin } = await supabase
      .from("admin")
      .select()
      .eq("user_id", user?.id)
      .maybeSingle();

    await supabase.auth.update({ data: { isAdmin: admin !== null } });
  };

  const signIn = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({ email, password });

    setUser(user);
    setAuthError(error);
  };

  useEffect(() => {
    if (user === null) return;

    updateAdmin();
  }, [user]);

  const signOut = async () => {
    const res = await supabase.auth.signOut();
    setUser(null);
    setAuthError(res.error);
  };

  const signUp = async (email: string, password: string) => {
    const res = await supabase.auth.signUp({ email, password });
    setUser(res.user);
    setAuthError(res.error);
  };

  const authContext: AuthContextInterface = {
    user,
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
