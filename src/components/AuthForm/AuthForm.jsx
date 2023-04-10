import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "hooks/useAuth";

const userSchema = Yup.object().shape({
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

const userSchemaLogin = Yup.object().shape({
  // date: Yup.date().required('Data is a required field'),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    // .max(20, 'Too Long!')
    .required("Required"),
});

const initialSignup = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

const initialLogin = {
  email: "",
  password: "",
};

const AuthForm = ({ isSignup, onSubmit }) => {
  const { error } = useAuth();
  console.log("error", error);
  const initialValues = isSignup ? initialSignup : initialLogin;
  console.log("initialValues", initialValues);
  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={(msg) => <p className="text-danger">{msg}</p>}
      />
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isSignup ? userSchema : userSchemaLogin}
      onSubmit={(values, { setSubmitting }) => {
        console.log("values", values);
        onSubmit(values);
      }}
    >
      {({ values, handleSubmit, handleChange }) => (
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {isSignup && (
                <>
                  <label htmlFor="exampleInputName">Name</label>
                  <Field
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputName"
                    // aria-describedby="nameHelp"
                  />
                  <FormError name="name" />
                  <label htmlFor="exampleInputSurname">Surname</label>
                  <Field
                    type="text"
                    name="surname"
                    value={values.surname}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputSurname"
                    // aria-describedby="nameHelp"
                  />
                  <FormError name="surname" />
                </>
              )}

              <label htmlFor="exampleInputEmail1">Email address</label>
              <Field
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <FormError name="email" />
              {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <Field
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="form-control"
                id="exampleInputPassword1"
              />
              <FormError name="password" />
            </div>

            <button
              type="submit"
              onClick={() => console.log("click")}
              className="btn btn-primary"
            >
              {isSignup ? "Sign up" : "Log in"}
            </button>
            <button>Sign in with Google</button>
            <button>Sign in with Facebook</button>
            <button>Sign in with phone</button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default AuthForm;
