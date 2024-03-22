import {
  faArrowRotateLeft,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Phoneavatar({ updateAvatar }) {
  let navigate = useNavigate();
  const { id } = useParams();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchAvatarData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        const gambar = response.data.avatar;
        setAvatar(gambar);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAvatarData();
  }, [id]);

  const [selectImages, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setAvatar(e.target.files[0]);
    }
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    updateAvatar(id, avatar);
    navigate("/");
  };

  return (
    <div className="body-avatar">
      <div className="container-avatar">
        <div className="title-wrapper">
          <h1>Change Avatar</h1>
        </div>
        <form onSubmit={handleAvatarSubmit}>
          <div className="body-avatar">
            <div className="img-avatar">
              <label htmlFor="avatar">Avatar</label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={imageChange}
              />
            </div>
            <div className="priview">
              <label>Priview</label>
              {selectImages ? (
                <img src={URL.createObjectURL(selectImages)} />
              ) : (
                <img
                  src={
                    "http://localhost:3000/images/" +
                    (avatar !== null ? `${avatar}` : "ava-default.jpeg")
                  }
                />
              )}
            </div>
          </div>
          <div className="footer-avatar">
            <button type="submit">
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
            <Link to={"/"}>
              <button>
                <FontAwesomeIcon icon={faArrowRotateLeft} />
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
