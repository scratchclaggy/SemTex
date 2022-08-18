import { Container } from "@mui/system";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container maxWidth="xl">
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
