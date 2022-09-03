import { Stack, Typography } from "@mui/material";
import {useRouter} from 'next/router';

const UserCodeBox = () => {
  const router = useRouter()

  function handleClick(e: any)
  {
    if(e.key === "Enter"){
      e.preventDefault();
      router.push('/semtex')
    }
  }

    return (
      <Stack
      alignItems="center"
      spacing={1}
      mt={"40vh"}
      >
        <Typography>Welcome To SemTex</Typography>
        <form>
          <input 
          type="text"
          placeholder="Enter Code"
          onKeyPress={handleClick}

          style={{        
            width:"450px",
            height:"85px",
            textAlign: "left",
            fontSize: "70px",
            margin: "5px"
          }}
          >
          </input>

        </form>
        <a href="">Don't Have a Code?</a>
        <a href="">Administrator Login</a>


      </Stack>  
    );
};

export default UserCodeBox;