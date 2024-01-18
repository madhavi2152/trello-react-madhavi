import { useRef, useState } from "react";
import CardsDisplay from "./CardsDisplay";
import { AddCard, ArchiveList } from "./API";
import Checklist from "./Checklist";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

function ListDisplay(props) {
  let [render, setRender] = useState(true);
  let [value, setValue] = useState("");
  let [showcl, setShowcl] = useState(false);
  let [clid, setClid] = useState({ id: "", showcl: "" });
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
    setClid((prev) => ({
      ...prev,
      id: showcl ? "" : id,
      showcl: !prev.showcl,
    }));

    console.log(id);
  }

  return (
    <div>
      <ul
        style={{
          backgroundColor: "wheat",
          margin: "20px",
          // marginTop: "200px",
          padding: "5px",
          borderRadius: "10px",
          boxShadow: "0 0 10px gray", // Add your box shadow styles here
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
        {console.log(clid)}
        {clid.showcl && <Checklist id={clid.id} />}{" "}
        <form
          onSubmit={(e) => {
            handleSubmit(e, row.id);
          }}
          style={{
            display: "flex",
            border: "none",
            borderRadius: "5px",
            height: "30px",
            margin: "10px",
            marginBottom: "30px",
            padding: "10px,",
            // boxShadow: "0 0 1px gray",
          }}
        >
          <input
            type="text"
            value={value}
            placeholder="add card"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            style={{
              border: "none",
              borderRadius: "5px",
              height: "30px",
              marginRight: "10px",
              boxShadow: "0 0 10px gray",
            }}
          ></input>
          <IconButton color="primary" type="submit" aria-label="Add">
            <AddIcon />
          </IconButton>
        </form>
        <form
          onSubmit={(e) => {
            handleListArchive(e, row.id);
          }}
          style={{
            border: "none",
            borderRadius: "5px",
            height: "30px",
            margin: "10px",
            marginBottom: "30px",
            padding: "10px,",
          }}
        >
          <button
            type="submit"
            style={{
              textDecoration: "none",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "white",
              boxShadow: "0 0 10px gray",
            }}
          >
            Archive list
          </button>
        </form>
      </ul>
    </div>
  );
}
export default ListDisplay;
