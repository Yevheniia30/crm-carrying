import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  // date: Yup.date().required('Data is a required field'),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
  surname: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid surname"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    // .max(20, 'Too Long!')
    .required("Required"),
});

export const userSchemaLogin = Yup.object().shape({
  // date: Yup.date().required('Data is a required field'),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    // .max(20, 'Too Long!')
    .required("Required"),
});
