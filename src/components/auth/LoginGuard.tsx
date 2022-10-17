import { useRouter } from "next/router";
import useAuth from "src/contexts/AuthContext";

const LoginGuard = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const router = useRouter();

  const unprotectedPaths = ["/sign-in", "/sign-up"];

  if (user || unprotectedPaths.some((path) => path === router.pathname)) {
    return <>{children}</>;
  }

  router.push("/sign-in");

  return null;
};

export default LoginGuard;
