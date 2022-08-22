import { ApiError, Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import supabase from "utils/supabase";
import create from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  user: User | null;
  session: Session | null;
  error: ApiError | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
};

const UserStore = create<UserState>(
  // @ts-ignore
  persist(
    (set, get) => ({
      user: supabase.auth.user(),
      session: supabase.auth.session(),
      error: null,
      signIn: async (email, password) => {
        const res = await supabase.auth.signIn({
          email,
          password,
        });
        set({ ...get(), ...res });
      },
      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        set({ ...get(), error, user: null, session: null });
      },
      signUp: async (email, password) => {
        const res = await supabase.auth.signUp({
          email,
          password,
        });
        set({ ...get(), ...res });
      },
    }),
    {
      name: "session-storage",
    }
  )
);

// HACK: This may not be necessary in the future, but is currently required to handle hyrdation errors
const useUserStore = ((selector, compare) => {
  const store = UserStore(selector, compare);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return hydrated
    ? store
    : selector({
        user: null,
        session: null,
        error: null,
        signIn: () => {},
        signOut: () => {},
        signUp: () => {},
      });
}) as typeof UserStore;

export default useUserStore;
