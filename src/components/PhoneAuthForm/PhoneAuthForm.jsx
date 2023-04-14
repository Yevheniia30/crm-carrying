import { Formik, Field, ErrorMessage } from "formik";
import { useAuth } from "hooks/useAuth";
import { useState } from "react";

const PhoneAuthForm = ({ res }) => {
  //   const { onSubmitWithPhone, onSubmitVerify } = useAuth();
  const { handleSubmitWithPhone, handleSubmitVerify } = useAuth();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const handleGetOtp = (e) => {
    e.preventDefault();
    console.log("phone", phone);

    // onSubmitWithPhone(phone);
    handleSubmitWithPhone(phone);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    console.log("code", code);
    // onSubmitVerify(code);
    handleSubmitVerify(code);
  };
  return (
    <>
      {res ? (
        <form
          className="d-flex flex-row justify-content-around"
          //   onSubmit={handleVerifyOtp}
        >
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="inputCode2" className="sr-only">
              Code from SMS
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCode2"
              placeholder="Code from SMS"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div>
            <button
              //   type="submit"
              className="btn btn-primary mb-2 mr-2"
              data-dismiss="modal"
              onClick={handleVerifyOtp}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-secondary mb-2"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <form
          className="d-flex flex-row justify-content-around"
          onSubmit={handleGetOtp}
        >
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="inputPhoneNumber2" className="sr-only">
              Phone number
            </label>
            <input
              type="tel"
              className="form-control"
              id="inputPhoneNumber2"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div id="recaptcha-container" />

          <div>
            <button type="submit" className="btn btn-primary mb-2 mr-2">
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-secondary mb-2 "
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default PhoneAuthForm;

// {
//   !res ? (
//     <form onSubmit={handleGetOtp}>
//       <input
//         type="tel"
//         placeholder="+380"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//       <div id="recaptcha-container" />

//       <button
//         type="button"
//         // onClick={handleCancel}
//         className="btn btn-secondary"
//         data-dismiss="modal"
//       >
//         Cancel
//       </button>
//       <button
//         // type="button"
//         className="btn btn-primary"
//         // data-dismiss="modal"
//       >
//         Confirm
//       </button>
//     </form>
//   ) : (
//     <form onSubmit={handleVerifyOtp}>
//       <input
//         type="text"
//         placeholder="Enter code"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//       />

//       <button type="button" className="btn btn-secondary" data-dismiss="modal">
//         Cancel
//       </button>
//       <button type="button" className="btn btn-primary" data-dismiss="modal">
//         Send code
//       </button>
//     </form>
//   );
// }
