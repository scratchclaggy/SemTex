import { useRouter } from "next/router";
import useAuth from "src/contexts/AuthContext";

const LoginGuard = ({ children }: { children: JSX.Element }) => {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const unprotectedPaths = ["/sign-in", "/sign-up"];

  if (user || unprotectedPaths.some((path) => path === router.pathname)) {
    if (!isAdmin && router.pathname.startsWith("/admin")) {
      router.push("/");

      return null;
    }

    return <>{children}</>;
  }

  router.push("/sign-in");

  return null;
};

export default LoginGuard;
