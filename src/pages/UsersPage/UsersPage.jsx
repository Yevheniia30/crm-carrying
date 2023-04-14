import { useEffect, useState } from "react";
import axios from "axios";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query } from "firebase/firestore";
import { db } from "firebaseConfig";
import { tHeadArr } from "./constants";
import UsersItem from "./UsersItem";
import Modal from "components/Modal/Modal";
import EditUserForm from "components/EditUserForm/EditUserForm";
// import { getAuth, listUsers } from "firebase/auth";

const UsersPage = () => {
  const [users, loading, error] = useCollection(query(collection(db, "users")));
  const [currentUser, setCurrentUser] = useState(null);
  console.log("current ", currentUser);

  const elements = users?.docs.map((doc, idx) => (
    <UsersItem
      key={doc.id}
      item={doc}
      idx={idx}
      setCurrentUser={setCurrentUser}
    />
  ));

  return (
    <>
      <div className="mt-3">
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}

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
      <Modal title="Edit user data">
        <EditUserForm user={currentUser} setCurrentUser={setCurrentUser} />
      </Modal>
    </>
  );
};

export default UsersPage;
