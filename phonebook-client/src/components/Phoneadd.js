import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Phoneadd({
  item,
  setItem,
  user,
  setUser,
  sort,
  setSort,
}) {
  let navigate = useNavigate();
  const addData = () => {
    axios
      .post("http://localhost:3000/users", {
        ...dataku,
      })
      .then((response) => {
        console.log("masuk");
        setItem((item) => {
          return [
            ...item.filter((data) => data.id !== response.data.id),
            {
              id: response.data.id,
              name: response.data.name,
              phone: response.data.phone,
            },
          ];
        });
        console.log("ini adalah", navigate);
      })

      .catch(function (error) {
        console.log(error);
      });
    navigate("/");
  };

  const [dataku, setDataku] = useState({ name: "", phone: "" });

  return (
    <form className="container-form" onSubmit={addData}>
      <div className="container-add">
        <input
          className="input-add"
          type="text"
          required
          onChange={(e) => setDataku({ ...dataku, name: e.target.value })}
        />
        <input
          type="text"
          required
          className="input-add"
          onChange={(e) => setDataku({ ...dataku, phone: e.target.value })}
        />
        <div className="btn-item-add">
          <button className="btn-save" type="submit">
            save
          </button>
          <button className="btn-cancel" onClick={() => navigate("/")}>
            cancel
          </button>
        </div>
      </div>
    </form>
  );
}
