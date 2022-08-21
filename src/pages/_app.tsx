import { Button, Container } from "@mui/material";
import type { AppProps } from "next/app";
import useUserStore from "src/hooks/auth";

function MyApp({ Component, pageProps }: AppProps) {
  const user = useUserStore((state) => state.user);
  const signOut = useUserStore((state) => state.signOut);

  return (
    <Container maxWidth="lg">
      {user && (
        <Button
          variant="outlined"
          onClick={signOut}
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
          }}
        >
          Sign Out
        </Button>
      )}
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
