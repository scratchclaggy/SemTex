import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import LoginGuard from "src/components/auth/LoginGuard";
import Header from "src/components/ui/Header";
import { AuthProvider } from "src/contexts/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette:{
    primary:{
      main: "#121858"
    },
    secondary:{
      main: "#99e4ee"
    },
    background:{
      default: "#90caf9"
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
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
    </ThemeProvider>
  );
}

export default MyApp;
