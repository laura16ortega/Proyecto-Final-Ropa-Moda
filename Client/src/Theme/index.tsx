import { createTheme } from "@mui/material/styles";
import { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";

export const LinkBehavior = forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  Omit<LinkProps, "to"> & { href: LinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;

  // Map href (MUI) -> to (react-router)
  return <Link ref={ref} to={href} {...other} />;
});

const lightTheme = createTheme(
  {
    palette: {
      primary: {
        light: "#757ce8",
        main: "#24262b",
        contrastText: "#fff",
      },
      secondary: {
        light: "#FAFAFA",
        main: "#F4F4F6",
        dark: "#FAFAFA",
        contrastText: "#F4F4F6",
      },
      error: {
        main: "#f44336",
      },
    },
  },
  {
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        },
      },
    },
  }
);

export default lightTheme;
