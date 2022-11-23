import { blue, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#24262b",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FAFAFA",
      main: "#F4F4F6",
      dark: "#FAFAFA",
      contrastText: "#F4F4F6",
    },
    error: {
      main: "#24262b",
    },
  },
});

export default lightTheme;
