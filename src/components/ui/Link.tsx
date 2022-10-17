import { Link as MuiLink } from "@mui/material";
import NextLink from "next/link";

type LinkProps = {
  href: string;
  label: string;
};

const Link: React.FC<LinkProps> = ({ href, label }) => {
  return (
    <NextLink href={href} passHref>
      <MuiLink>{label}</MuiLink>
    </NextLink>
  );
};

export default Link;
