import { Container } from "@mui/system";
import type { AppProps } from "next/app";
import supabase from "utils/supabase";

function MyApp({ Component, pageProps }: AppProps) {
  const client = supabase;

  console.log(client);

  return (
    <Container maxWidth="lg">
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
