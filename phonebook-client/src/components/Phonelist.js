import Phoneitem from "./Phoneitem";

export default function Phonelist({ item, setItem, updateData, deleteData }) {
  return (
    <div className="phonelist">
      {item.map((user) => {
        return (
          <Phoneitem
            key={user.id}
            deleteData={deleteData}
            updateData={updateData}
            item={item}
            setItem={setItem}
            user={user}
          />
        );
      })}
    </div>
  );
}
