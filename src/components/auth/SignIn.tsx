import { LockOutlined } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useAuth from "src/contexts/AuthContext";
import Link from "../ui/Link";

type FormInput = {
  email: string;
  password: string;
};

const SignIn = () => {
  // Redirect to home page if user already exists
  const router = useRouter();
  const { user, authError, signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    signIn(data.email, data.password);
  };

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <Stack
      marginTop={16}
      marginLeft={22}
      spacing={2}
      padding={5}
      width="30vw"
      alignItems="center"
      style={{ backgroundColor: "#F5F5F0" }}
    >
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {authError && <Alert severity="error">{authError?.message}</Alert>}
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        marginTop={3}
        width="66vw"
        maxWidth={600}
        spacing={2}
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Required" },
          }}
          render={({ field }) => (
            <TextField
              fullWidth
              required
              id="email"
              label="Email Address"
              helperText={errors.email?.message}
              error={!!errors.email}
              autoComplete="email"
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Required" },
          }}
          render={({ field }) => (
            <TextField
              required
              fullWidth
              helperText={errors.password?.message}
              error={!!errors.password}
              id="password"
              label="Password"
              type="password"
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Link href="sign-up" label="Don't have an account? Sign up" />
      </Stack>
    </Stack>
  );
};

export default SignIn;
