import { db } from "firebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query } from "firebase/firestore";

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
  const [trips, loading, error] = useCollection(query(collection(db, "trips")));

  const elements = trips?.docs.map((doc, idx) => (
    <tr key={doc.id}>
      <th scope="row" className="tAc">
        {idx + 1}
      </th>

      {tBodyArr.map((item) => (
        <td className="tAc">{doc.data()[item]}</td>
      ))}

      {/* <td>{doc.data().carNumber}</td>
      <td>{doc.data().departure}</td>
      <td>{doc.data().destination}</td>
      <td>{doc.data().passengersCount}</td> */}
      <td className="dFjSa">
        <button className="btn-warning rounded-sm border-0">
          <i className="bi bi-pencil"></i>
        </button>
        <button className="btn-danger rounded-sm border-0">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="mt-3">
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {/* {trips && <ul>{elements}</ul>} */}
      <table className="table table-striped table-bordered rounded">
        <thead className="thead-dark ">
          <tr>
            {tHeadArr.map((item) => (
              <th className="tAc">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{elements}</tbody>
      </table>
    </div>
  );
};

export default MainPage;
