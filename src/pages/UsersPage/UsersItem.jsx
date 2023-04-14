import { useState } from "react";
import Modal from "components/Modal/Modal";
import { tBodyArr } from "./constants";
import EditUserForm from "components/EditUserForm/EditUserForm";

const UsersItem = ({ item, idx, setCurrentUser }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setCurrentUser(item.data());
  };

  return (
    <>
      <tr>
        <th scope="row" className="tAc">
          {idx + 1}
        </th>

        {tBodyArr.map((i) => (
          <td key={i} className="tAc">
            {item.data()[i] ?? "-"}
          </td>
        ))}

        <td className="dFjSa">
          <button
            className="btn-warning rounded-sm border-0"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={handleEdit}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn-danger rounded-sm border-0">
            <i className="bi bi-trash"></i>
          </button>
        </td>
      </tr>
      {/* {isModalOpen && ( */}
      {/* <Modal title="Edit user data">
        <EditUserForm />
      </Modal> */}
      {/* )} */}
    </>
  );
};

export default UsersItem;
