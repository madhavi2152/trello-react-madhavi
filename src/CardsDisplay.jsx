import { ListItem } from "@mui/material";
import { cardDelete } from "./API";
import { useState } from "react";

function CardsDisplay(props) {
  let { row, handleDelete, handlecheck } = props;
  let [render, setRender] = useState(true);
  function handleCardDelete(id) {
    cardDelete(id);
    handleDelete();
    setRender((prev) => !prev);
  }
  return (
    <>
      <ListItem
        key={row.id}
        style={{
          position: "relative",
          backgroundColor: "white",
          margin: "10px",
          textDecoration: "none",
          listStyle: "none",
          borderRadius: "5px",
        }}
        onClick={(e) => {
          handlecheck();
        }}
      >
        {/* {console.log(row)} */}
        {row.name}
        <button
          onClick={() => {
            handleCardDelete(row.id);
          }}
        >
          delete
        </button>
      </ListItem>
    </>
  );
}
export default CardsDisplay;
