import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import LoginGuard from "src/components/auth/LoginGuard";
import Header from "src/components/ui/Header";
import { AuthProvider } from "src/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <LoginGuard>
        <>
          <Header />
          <Container maxWidth="lg">
            <Component {...pageProps} />
          </Container>
        </>
      </LoginGuard>
    </AuthProvider>
  );
}

export default MyApp;
