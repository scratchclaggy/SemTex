import { Stack, Typography } from "@mui/material";
import {useRouter} from 'next/router';

const UserCodeBox = () => {
  const router = useRouter()

  // I think this isn't the best way to do this, Remember to come back to this
  function handleClick(e: any)
  {
    if(e.key === "Enter"){
      e.preventDefault();
      router.push('src/components/semtex/Semtex.tsx')
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
          onKeyPress={handleClick}
          /*I think I prefer to use px here because it looks better
            when the input box doesn't scale with viewport? Remember to come back to this*/
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
        <button>Don't Have a Code?</button>
        <button>Administrator Login</button>


      </Stack>  
    );
};

export default UserCodeBox;