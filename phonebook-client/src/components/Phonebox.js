import Phonebar from "./Phonebar";
import Phonelist from "./Phonelist";

export default function Phonebox({
  setItem,
  item,
  keyword,
  setKeyword,
  sort,
  setSort,
  user,
  setUser,
  updateData,
}) {
  return (
    <div className="container">
      <div className="header">
        <Phonebar
          keyword={keyword}
          setKeyword={setKeyword}
          sort={sort}
          setSort={setSort}
        />
      </div>
      <div className="body">
        <Phonelist
          updateData={updateData}
          setItem={setItem}
          item={item}
          user={user}
          setUser={setUser}
        />
      </div>
    </div>
  );
}
