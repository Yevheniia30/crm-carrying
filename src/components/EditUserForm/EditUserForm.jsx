import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";

const EditUserForm = ({ user, setCurrentUser }) => {
  const [state, setState] = useState(null);

  console.log("state", state);

  useEffect(() => {
    setState(user);
  }, [user]);

  useEffect(() => {
    // setState(user);
    return () => {
      setCurrentUser(null);
    };
  }, [setCurrentUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", state.uid), state);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!user) {
    return null;
  }

  // const { displayName, uid, role, email, phoneNumber } = state;
  const roles = ["User", "Driver", "Operator", "Admin"];
  const options = roles.map((item) => <option key={item}>{item}</option>);
  return (
    <form>
      <div className="form-group">
        <label htmlFor="displayName">Full name</label>
        <input
          type="text"
          className="form-control"
          id="displayName"
          placeholder="Name"
          value={state?.displayName || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          value={state?.email || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          type="tel"
          className="form-control"
          id="phoneNumber"
          value={state?.phoneNumber || ""}
          onChange={handleChange}
          placeholder="Phone number"
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          value={state?.role || ""}
          className="form-control"
          id="role"
          onChange={handleChange}
        >
          {options}
        </select>
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary mr-2"
          data-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          data-dismiss="modal"
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
