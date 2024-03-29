import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownZA,
  faArrowUpZA,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ButtonSortAsc = ({ sort, setSort }) => {
  return (
    <>
      <button className="btnSortAsc">
        <FontAwesomeIcon
          icon={faArrowDownZA}
          onClick={() => {
            setSort("desc");
          }}
        />
      </button>
    </>
  );
};

const ButtonSortDesc = ({ sort, setSort }) => {
  return (
    <>
      <button className="btnSortDesc">
        <FontAwesomeIcon
          icon={faArrowUpZA}
          onClick={() => {
            setSort("asc");
          }}
        />
      </button>
    </>
  );
};

// const ButtonAdd = (navigate) => {
//   return (

// };

export default function Phonebar({ keyword, setKeyword, sort, setSort }) {
  const navigate = useNavigate();
  const search = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };

  return (
    <div className="container-phonebar">
      <div className="container-form">
        {sort == "asc" || sort.sort == "asc" ? (
          <ButtonSortAsc sort={sort} setSort={setSort} />
        ) : (
          <ButtonSortDesc sort={sort} setSort={setSort} />
        )}
        <input
          className="input-form"
          value={keyword}
          placeholder="Search"
          onInput={search}
          id="findbar"
        />
        <button className="btnAddName" onClick={() => navigate("/add")}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </div>
    </div>
  );
}
