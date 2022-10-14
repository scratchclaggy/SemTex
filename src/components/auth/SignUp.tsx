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
import Link from "src/components/ui/Link";
import useAuth from "src/contexts/AuthContext";

type FormInput = {
  email: string;
  password: string;
};

const SignUp = () => {
  const { user, authError, signUp } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    signUp(data.email, data.password);
  };

  if (user) {
    router.push("/");
    return null;
  }

  return (
    <Stack
      marginTop={16}
      mx="auto"
      spacing={2}
      padding={5}
      width="30vw"
      minWidth={700}
      alignItems="center"
      style={{ backgroundColor: "#F5F5F0" }}
    >
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
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
            pattern: {
              value: /^(.+)@(.+)$/,
              message: "Please enter valid email",
            },
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
            minLength: {
              value: 12,
              message: "Passwords must be at least 12 characters long",
            },
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
          Sign Up
        </Button>
        <Link href="sign-in" label="Already have an account? Sign in" />
      </Stack>
    </Stack>
  );
};

export default SignUp;
