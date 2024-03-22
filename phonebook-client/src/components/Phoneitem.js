import {
  faArrowRotateLeft,
  faFloppyDisk,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

export default function Phoneitem({ user, updateData, deleteData }) {
  const submitDelete = (user) => {
    confirmAlert({
      title: "CONFIRM TO DELETE",
      message: `Are you sure to delete this contact ${user.name}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteData(user.id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const [onEdit, setOnEdit] = useState(false);
  const [newData, setNewData] = useState({
    name: user.name,
    phone: user.phone,
  });
  if (onEdit) {
    return (
      <div className="container-item">
        <div className="content-item">
          <div className="content-avatar">
            <div className="content-avatar-img">
              <Link to={`/${user.id}/avatar`}>
                <img
                  src={
                    "http://localhost:3000/images/" +
                    (user.avatar == null
                      ? "ava-default.jpeg"
                      : `${user.avatar}`)
                  }
                />
              </Link>
            </div>
          </div>
          <div className="body-item">
            <div className="item-identity-edit">
              <input
                type="text"
                value={newData.name}
                onChange={(event) =>
                  setNewData({ ...newData, name: event.target.value })
                }
              />
              <input
                type="text"
                value={newData.phone}
                onChange={(event) =>
                  setNewData({ ...newData, phone: event.target.value })
                }
              />
            </div>
            <div className="btn-item">
              <button
                onClick={() => {
                  updateData(user.id, {
                    name: newData.name,
                    phone: newData.phone,
                  });
                  setOnEdit(false);
                }}
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faArrowRotateLeft}
                  onClick={() => {
                    setOnEdit(false);
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-item">
        <div className="content-item">
          <div className="content-avatar">
            <div className="content-avatar-img">
              <Link to={`/${user.id}/avatar`}>
                <img
                  src={
                    "http://localhost:3000/images/" +
                    (user.avatar == null
                      ? "ava-default.jpeg"
                      : `${user.avatar}`)
                  }
                />
              </Link>
            </div>
          </div>
          <div className="body-item">
            <div className="item-identity">
              <p>{user.name}</p>
              <p>{user.phone}</p>
            </div>
            <div className="btn-item">
              <button
                onClick={() => {
                  setOnEdit(true);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button onClick={() => submitDelete(user)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
