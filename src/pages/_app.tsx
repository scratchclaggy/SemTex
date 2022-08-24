import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import Header from "src/components/ui/Header";
import { AuthProvider } from "src/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <>
        <Header />
        <Container maxWidth="lg">
          <Component {...pageProps} />
        </Container>
      </>
    </AuthProvider>
  );
}

export default MyApp;
