import { LockOutlined } from "@mui/icons-material";
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useUserStore from "src/hooks/auth";
import Link from "../ui/Link";

type FormInput = {
  email: string;
  password: string;
};

const SignIn = () => {
  // Redirect to home page if user already exists
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  if (user) {
    router.push("/");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const signIn = useUserStore((state) => state.signIn);
  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
    signIn(data.email, data.password);
  };

  return (
    <Stack marginTop={8} spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
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
