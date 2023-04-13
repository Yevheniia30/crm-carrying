import { useEffect } from "react";
import axios from "axios";
// import { auth } from "firebaseConfig";
// import { getAuth, listUsers } from "firebase/auth";

const UsersPage = () => {
  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        // setUsers(response.data);
        console.log("resp users", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <p>UsersPage</p>;
};

export default UsersPage;
