import { useEffect } from "react";
// import { auth } from "firebaseConfig";
import { getAuth, listUsers } from "firebase/auth";

const UsersPage = () => {
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const listUsersResult = await auth.listUsers();
  //     const users = listUsersResult.users;
  //     console.log(users);
  //     // Тут можна зробити щось зі списком користувачів, наприклад, відобразити їх у вашому React-застосунку
  //   };
  //   getUsers();
  // }, []);

  useEffect(() => {
    // getAuth()
    //   .listUsers()
    //   .then((userRecords) => {
    //     userRecords.forEach((user) => {
    //       console.log(user.uid, user.email, user.displayName);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("Error fetching user list:", error);
    //   });
  }, []);

  return <p>UsersPage</p>;
};

export default UsersPage;
