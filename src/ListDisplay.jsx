import { useRef, useState } from "react";
import CardsDisplay from "./CardsDisplay";
import { AddCard } from "./API";

function ListDisplay(props) {
  let [render, setRender] = useState(true);
  let [value, setValue] = useState("");
  let { row, card, idBoard, Card, setCard, setcardfun } = props;
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

  function handleListArchive(e, listId) {
    e.preventDefault();
    ArchiveList(listId);
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
            console.log(row.name);
          }
          return <CardsDisplay row={row} />;
        })}
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
        {/* <form
          onSubmit={(e) => {
            idBoard.current ? handleListArchive(e, row.id) : "";
          }}
        >
          <button type="submit">Archive list</button>
        </form> */}
      </ul>
    </div>
  );
}
export default ListDisplay;
