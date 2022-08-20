import { ApiError, Session, User } from "@supabase/supabase-js";
import supabase from "utils/supabase";
import create from "zustand";

type UserState = {
  user: User | null;
  session: Session | null;
  error: ApiError | null;
  refreshSession: () => void;
  signUp: (email: string, password: string) => void;
};

const useUserStore = create<UserState>((set) => ({
  user: null,
  session: null,
  error: null,
  refreshSession: () => {
    const session = supabase.auth.session();
    set((state) => ({ ...state, session, user: session?.user }));
  },
  signUp: async (email, password) => {
    const res = await supabase.auth.signUp({
      email,
      password,
    });
    set((state) => ({ ...state, ...res }));
  },
}));

export default useUserStore;
