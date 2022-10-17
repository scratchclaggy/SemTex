import { Login, Person } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "src/contexts/AuthContext";

const UserHeader = () => {
  const { user, signOut } = useAuth();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "palette.background.default",
        paddingX: "2rem",
        paddingY: "1rem",
      }}
    >
      <Link href={user?.user_metadata.isAdmin ? "/admin" : "/"}>
        <ButtonBase>
          <Image src="/logo.png" alt="Home" width={150} height={65} />
        </ButtonBase>
      </Link>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="first baseline"
        spacing={3}
        sx={{ backgroundColor: "palette.background.default" }}
      >
        <Typography variant="h6">{user!.email}</Typography>

        <Button variant="contained" endIcon={<LogoutIcon />} onClick={signOut}>
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
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "palette.background.default",
        paddingX: "2rem",
        paddingY: "1rem",
      }}
    >
      <ButtonBase>
        <Image src="/logo.png" alt="Home" width={150} height={65} />
      </ButtonBase>

      {isSignIn ? (
        <Link href="/sign-up">
          <Button variant="outlined" startIcon={<Person />}>
            Sign Up
          </Button>
        </Link>
      ) : (
        <Link href="/sign-in">
          <Button variant="outlined" startIcon={<Login />}>
            Sign In
          </Button>
        </Link>
      )}
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
