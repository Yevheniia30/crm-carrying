import { useEffect, useState } from "react";
import axios from "axios";
// import { auth } from "firebaseConfig";
// import { getAuth, listUsers } from "firebase/auth";

const tHeadArr = ["#", "Full name", "Phone", "Email", "Role", "Action"];

const tBodyArr = ["displayName", "phoneNumber", "email", "role"];

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response.data);
        console.log("resp users", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const elements = users?.map((item, idx) => (
    <tr key={item.uid}>
      <th scope="row" className="tAc">
        {idx + 1}
      </th>

      {tBodyArr.map((i) => (
        <td key={i} className="tAc">
          {item[i] ?? "-"}
        </td>
      ))}

      <td className="dFjSa">
        <button className="btn-warning rounded-sm border-0">
          <i className="bi bi-pencil"></i>
        </button>
        <button className="btn-danger rounded-sm border-0">
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="mt-3">
      {/* {error && <strong>Error: {JSON.stringify(error)}</strong>} */}
      {/* {loading && <span>Collection: Loading...</span>} */}
      {/* {trips && <ul>{elements}</ul>} */}
      <table className="table table-striped table-bordered rounded">
        <thead className="thead-dark ">
          <tr>
            {tHeadArr.map((item) => (
              <th key={item} className="tAc">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </div>
  );
};

export default UsersPage;
