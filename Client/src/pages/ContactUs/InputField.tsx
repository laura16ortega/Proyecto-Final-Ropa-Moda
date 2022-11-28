import { FieldProps, getIn } from "formik";
import { TextField } from "@mui/material";
import s from "./Contact.module.css";

const InputField = ({ field, form, ...props }: FieldProps) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  //TODO settear limite de los demas campos o Crear uno individual
  return (
    <TextField
      fullWidth
      margin="normal"
      autoComplete="off"
      multiline={field.name === "message"}
      maxRows={field.name === "message" ? Infinity : 2}
      variant="standard"
      helperText={errorText}
      error={Boolean(errorText)}
      {...field}
      {...props}
      className={s.inputField}
    />
  );
};

export default InputField;
