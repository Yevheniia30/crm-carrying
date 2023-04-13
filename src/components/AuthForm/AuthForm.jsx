import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "hooks/useAuth";
import Modal from "components/Modal/Modal";
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

const AuthForm = ({
  isSignup,
  onSubmitWithEmail,
  onSubmitWithGoogle,
  onSubmitWithFacebook,
  onSubmitWithPhone,
}) => {
  // const { error } = useAuth();
  // console.log("error", error);
  const initialValues = isSignup ? initialSignup : initialLogin;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [res, setRes] = useState(null);
  // console.log("initialValues", initialValues);
  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={(msg) => <p className="text-danger">{msg}</p>}
      />
    );
  };

  const handleCancel = () => {
    setPhone("");
    setIsModalOpen(false);
  };

  const handleGetOtp = async (e) => {
    e.preventDefault();
    console.log("phone", phone);
    setRes(null);
    try {
      const response = await onSubmitWithPhone(phone);
      console.log("response", response);
      setRes(response);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log("code", code);
    try {
      await res.confirm(code);
    } catch (error) {
      console.log("error", error.message);
    }
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
              onClick={() => onSubmitWithGoogle()}
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
              onClick={() => onSubmitWithFacebook()}
            >
              <i
                className="fa fa-facebook-f fa-lg mr-2"
                style={{ color: "#3b5998" }}
              ></i>
              Sign in with Facebook
            </button>
            <button
              type="submit"
              className="btn btn-outline-dark w200 mb-2"
              onClick={() => setIsModalOpen(true)}
            >
              <i
                className="bi bi-phone-fill fa-lg mr-2"
                style={{ color: "#545457" }}
              ></i>
              Sign in with phone
            </button>
          </form>
          {isModalOpen && (
            <Modal>
              {!res ? (
                <form onSubmit={handleGetOtp}>
                  <input
                    type="tel"
                    placeholder="+380"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div id="recaptcha-container" />
                  <button>Confirm</button>
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  {/* <div id="recaptcha-container" /> */}
                  <button>Send code</button>
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </form>
              )}
            </Modal>
          )}
        </div>
      )}
    </Formik>
  );
};

export default AuthForm;
