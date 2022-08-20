import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import useUserStore from "src/hooks/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const refreshSession = useUserStore((state) => state.refreshSession);

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <Container maxWidth="lg">
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
