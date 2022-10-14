import { Alert, AlertTitle, Stack, Typography } from "@mui/material";
import { PostgrestError } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "src/contexts/AuthContext";
import supabase from "src/utils/supabase";
import { useSWRConfig } from "swr";

type Inputs = {
  passKey: string;
};

const UserCodeBox = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<Inputs>();
  const [error, setError] = useState<PostgrestError | null>(null);
  const { mutate } = useSWRConfig();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { data, error } = await supabase.rpc("check_dataset_passkey", {
      userid: user?.id,
      dataset_passkey: formData.passKey,
    });

    mutate("dataset");

    setError(error);

    if (data) {
      router.push(`/dataset/${data}`);
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error {error.code}</AlertTitle>
          <Typography>{error.message}</Typography>
          {error.details && <Typography>Details: {error.details}</Typography>}
          {error.hint && <Typography>hint: {error.hint}</Typography>}
        </Alert>
      )}
      <Stack alignItems="center" spacing={1} mt={"25vh"}>
        <Typography
          style={{
            fontFamily: "Roboto",
            fontSize: "50px",
          }}
        >
          Please Enter Your Access Code
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Enter Code"
            style={{
              width: "66vh",
              height: "10vh",
              minHeight: "100px",
              minWidth: "500px",
              textAlign: "left",
              fontSize: "70px",
              margin: "5px",
              borderRadius: "16px",
              backgroundColor: "#F5F5F0",
            }}
            {...register("passKey")}
          />
        </form>
      </Stack>
    </>
  );
};

export default UserCodeBox;
