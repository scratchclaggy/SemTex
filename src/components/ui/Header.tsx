import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "src/contexts/AuthContext";

const UserHeader = () => {
  const { user, isAdmin, signOut } = useAuth();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ padding: "15px" }}
    >
      {isAdmin && (
        <Link href={isAdmin ? "/admin" : "/"}>
          <ButtonBase>
            <Typography variant="h6">Home</Typography>
          </ButtonBase>
        </Link>
      )}
      <Stack
        direction="row"
        justifyContent="end"
        spacing={2}
        sx={{ backgroundColor: "palette.background.default" }}
      >
        <Typography variant="h6">{user!.email}</Typography>
        <Button variant="outlined" onClick={signOut}>
          Sign Out
        </Button>
      </Stack>
    </Stack>
  );
};

const AnonymousHeader = () => {
  const router = useRouter();

  const isSignIn = router.pathname === "/sign-in";

  return (
    <Stack
      direction="row"
      justifyContent="end"
      spacing={2}
      sx={{ backgroundColor: "palette.background.default", padding: "15px" }}
    >
      {isSignIn ? (
        <Link href="/sign-up">
          <Button variant="outlined">Sign Up</Button>
        </Link>
      ) : (
        <Link href="/sign-in">
          <Button variant="contained">Sign In</Button>
        </Link>
      )}
    </Stack>
  );
};

const Header = () => {
  const { user, authError } = useAuth();
  return (
    <Box
      sx={{
        borderBottom: "solid",
        borderWidth: "1px",
      }}
    >
      {user ? <UserHeader /> : <AnonymousHeader />}
      {authError && <Alert severity="error">{authError?.message}</Alert>}
    </Box>
  );
};

export default Header;
