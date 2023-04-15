import { db } from "firebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, setDoc, addDoc, doc } from "firebase/firestore";
import Modal from "components/Modal/Modal";
import CreateTripForm from "components/CreateTripForm/CreateTripForm";

const tHeadArr = [
  "#",
  "Car number",
  "From",
  "To",
  "Count of passengers",
  "Action",
];

const tBodyArr = ["carNumber", "departure", "destination", "passengersCount"];

const MainPage = () => {
  const [trips] = useCollection(query(collection(db, "trips")));
  const [users, loading, error] = useCollection(query(collection(db, "users")));

  // const drivers = users?.docs.filter((doc) => doc.data().role === "Driver");
  // const drivers = users?.docs
  //   .map((doc) => doc.data())
  //   .filter((item) => item.role === "Driver");
  // console.log("drivers", drivers);

  const drivers = users?.docs
    .filter((doc) => doc.data().role === "Driver")
    .map((item) => {
      return item.data();
    });

  const handleCreate = async ({
    carNumber,
    departure,
    destination,
    passengersCount,
  }) => {
    console.log(carNumber, departure, destination, passengersCount);
    try {
      await addDoc(collection(db, "trips"), {
        carNumber,
        departure,
        destination,
        passengersCount,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const elements = trips?.docs.map((doc, idx) => (
    <tr key={doc.id}>
      <th scope="row" className="tAc">
        {idx + 1}
      </th>

      {tBodyArr.map((item) => (
        <td key={item} className="tAc">
          {console.log(item)}
          {doc.data()[item]}
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
    <>
      <div className="mt-3">
        <button
          // onClick={handleCreate}
          data-toggle="modal"
          data-target="#exampleModal"
          className="btn btn-success"
        >
          Create new trip
        </button>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
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
      <Modal title="Create new trip">
        <CreateTripForm onSubmit={handleCreate} drivers={drivers} />
      </Modal>
    </>
  );
};

export default MainPage;
