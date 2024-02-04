import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Phonebox from "./components/Phonebox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Phoneadd from "./components/Phoneadd";

function App() {
  const [user, setUser] = useState({ name: "", phone: "" });
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("asc");

  const readData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users", {
        params: {
          keyword,
          sort,
        },
      });
      const { phonebook } = await response.data;
      if (phonebook) {
        setItem(phonebook);
        // setTotalPages(pages)
      }
      return;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
            />
          }
        />
        <Route
          path="/"
          element={
            <Phonebox
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
      </Routes>
    </Router>
  );

  function NoMatch() {
    return (
      <div className="nomatch">
        <h2>Nothing to see here!</h2>
        <h1>
          <FontAwesomeIcon icon={faArrowDown} />
        </h1>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }
}

export default App;
