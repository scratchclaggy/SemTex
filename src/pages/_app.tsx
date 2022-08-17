import { Container } from "@mui/system";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container maxWidth="lg">
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
