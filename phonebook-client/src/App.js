import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Phonebox from "./components/Phonebox";
import Phoneadd from "./components/Phoneadd";
import Phoneavatar from "./components/Phoneavatar";

function App() {
  const [user, setUser] = useState({ name: "", phone: "" });
  const [item, setItem] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("asc");
  const [avatar, setAvatar] = useState(null);
  const formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const readData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users", {
          params: {
            keyword,
            sort,
          },
        });
        const { phonebook, pages } = await response.data;
        if (phonebook) {
          setItem(phonebook);
          setTotalPages(pages);
        }
        return;
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    readData();
  }, [keyword, sort]);

  const updateData = (id, { name, phone }) => {
    axios
      .put(`http://localhost:3000/users/${id}`, { name, phone })
      .then((response) => {
        setItem((prevData) => [
          ...prevData.slice(
            0,
            prevData.findIndex((data) => data.id === response.data.id)
          ),
          {
            id: response.data.id,
            name: response.data.name,
            phone: response.data.phone,
            avatar: response.data.avatar,
          },
          ...prevData.slice(
            prevData.findIndex((data) => data.id === response.data.id) + 1
          ),
        ]);
      })
      .catch((error) => {
        window.alert(error, `your can't update`);
      });
  };

  function deleteData(id) {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then((response) => {
        setItem(item.filter((data) => data.id !== id));
      })
      .catch((err) => console.log("error Delete", err));
  }

  const updateAvatar = (id, avatar) => {
    formData.append("avatar", avatar);
    axios
      .put(`http://localhost:3000/users/${id}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setItem((prevData) => {
          return [
            ...prevData.filter((data) => data.id !== response.data.id),
            {
              id: response.data.id,
              name: response.data.name,
              phone: response.data.phone,
              avatar: response.data.avatar,
            },
          ];
        });
      })
      .catch((err) => {
        console.log("ini error update avatar", err);
      });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/add"
          element={
            <Phoneadd
              user={user}
              setUser={setUser}
              item={item}
              setItem={setItem}
              sort={sort}
              setSort={setSort}
            />
          }
        />
        <Route
          path="/"
          element={
            <Phonebox
              deleteData={deleteData}
              updateData={updateData}
              setItem={setItem}
              user={user}
              setUser={setUser}
              item={item}
              sort={sort}
              setSort={setSort}
              keyword={keyword}
              setKeyword={setKeyword}
            />
          }
        />
        <Route
          path="/:id/avatar"
          element={
            <Phoneavatar
              updateAvatar={updateAvatar}
              user={user}
              avatar={avatar}
              setAvatar={setAvatar}
              item={item}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
