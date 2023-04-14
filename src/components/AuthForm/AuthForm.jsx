import { Formik, Field, ErrorMessage } from "formik";
import { useMemo } from "react";
// import * as Yup from "yup";
import { userSchema, userSchemaLogin } from "utils/validations";
import { initialLogin, initialSignup } from "utils/initials";
import { useAuth } from "hooks/useAuth";
import Modal from "components/Modal/Modal";
import PhoneAuthForm from "components/PhoneAuthForm/PhoneAuthForm";

const AuthForm = ({ isSignup, onSubmitWithEmail }) => {
  const { handleSubmitWithGoogle, handleSubmitWithFacebook, res } = useAuth();
  // console.log("error", error);
  const initialValues = isSignup ? initialSignup : initialLogin;

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [phone, setPhone] = useState("");
  // const [code, setCode] = useState("");
  // const [res, setRes] = useState(null);
  // console.log("initialValues", initialValues);
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
      // onSubmit={(values, { setSubmitting }) => {
      //   console.log("values", values);
      //   onSubmit(values);
      // }}
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
              onClick={() => onSubmitWithEmail(values)}
              className="btn btn-primary w200 mb-2"
            >
              {isSignup ? "Sign up" : "Log in"}
            </button>
            <button
              type="submit"
              className="btn btn-outline-dark w200 mb-2"
              onClick={() => handleSubmitWithGoogle()}
            >
              <img
                width="20px"
                className="mr-2"
                alt="Google sign-in"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
              Sign in with Google
            </button>
            <button
              type="submit"
              className="btn btn-outline-dark w200 mb-2"
              onClick={() => handleSubmitWithFacebook()}
            >
              <i
                className="fa fa-facebook-f fa-lg mr-2"
                style={{ color: "#3b5998" }}
              ></i>
              Sign in with Facebook
            </button>
            <button
              type="button"
              className="btn btn-outline-dark w200 mb-2"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i
                className="bi bi-phone-fill fa-lg mr-2"
                style={{ color: "#545457" }}
              ></i>
              Sign in with phone
            </button>
          </form>

          <Modal title={res ? "Enter code from SMS" : "Enter phone number"}>
            <PhoneAuthForm res={res} />
          </Modal>
        </div>
      )}
    </Formik>
  );
};

export default AuthForm;
