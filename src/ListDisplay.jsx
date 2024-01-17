import { useRef, useState } from "react";
import CardsDisplay from "./CardsDisplay";
import { AddCard, ArchiveList } from "./API";
import Checklist from "./Checklist";

function ListDisplay(props) {
  let [render, setRender] = useState(true);
  let [value, setValue] = useState("");
  let [showcl, setShowcl] = useState(false);
  let [clid, setClid] = useState("");
  let { row, Card, setcardfun, carddelete, listdelete } = props;
  function handleSubmit(e, listId) {
    e.preventDefault();
    console.log(value);
    const fun = async (listId, val) => {
      let temp = await AddCard(listId, { idList: listId, name: val });
      let s = setcardfun(temp);
      console.log(s);
      console.log(Card);
    };
    fun(listId, value);
    setValue("");
  }

  function handleDelete(id, listid) {
    console.log(id, listid);
    carddelete(id, listid);
  }

  function handleListArchive(e, listId) {
    e.preventDefault();
    const fun = async () => {
      let archive = await ArchiveList(listId);
      listdelete(listId);
    };
    fun();
  }
  function HandleChecklist(id) {
    setShowcl((prev) => !prev);
    setClid(id);
    console.log(id);
  }

  return (
    <div>
      <ul
        style={{
          backgroundColor: "#ccc",
          margin: "20px",
          padding: "5px",
        }}
      >
        {row.name}
        {Card[row.id]?.map((row) => {
          {
            console.log(row);
            console.log(row.name);
          }
          return (
            <>
              <CardsDisplay
                row={row}
                handleDelete={() => handleDelete(row.id, row.idList)}
                handlecheck={() => HandleChecklist(row.id)}
              />
            </>
          );
        })}
        {console.log(showcl)}
        {showcl && <Checklist id={clid} />}
        <form
          onSubmit={(e) => {
            handleSubmit(e, row.id);
          }}
        >
          <input
            type="text"
            value={value}
            placeholder="add card"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></input>
          <button type="submit">+</button>
        </form>
        <form
          onSubmit={(e) => {
            handleListArchive(e, row.id);
          }}
        >
          <button type="submit">Archive list</button>
        </form>
      </ul>
    </div>
  );
}
export default ListDisplay;
