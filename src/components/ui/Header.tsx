import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import useAuth from "src/contexts/AuthContext";

const UserHeader = () => {
  const { user, signOut } = useAuth();
  return (
    <Stack direction="row" justifyContent="end" spacing={2}>
      <Typography variant="h6">{user!.email}</Typography>
      <Button variant="outlined" onClick={signOut}>
        Sign Out
      </Button>
    </Stack>
  );
};

const AnonymousHeader = () => {
  return (
    <Stack direction="row" justifyContent="end" spacing={2}>
      <Link href="/sign-up">
        <Button variant="outlined">Sign Up</Button>
      </Link>
      <Link href="/sign-in">
        <Button variant="contained">Sign In</Button>
      </Link>
    </Stack>
  );
};

const Header = () => {
  const { user, authError } = useAuth();
  return (
    <Box>
      {user ? <UserHeader /> : <AnonymousHeader />}
      {authError && <Alert severity="error">{authError?.message}</Alert>}
    </Box>
  );
};

export default Header;
