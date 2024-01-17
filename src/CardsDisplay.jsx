import { ListItem } from "@mui/material";
import PopOver from "./PopOver";
import { cardDelete } from "./API";
import { useState } from "react";

function CardsDisplay(props) {
  let { row } = props;
  let [render, setRender] = useState(true);

  const handleClic = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleCardDelete(id) {
    cardDelete(id);
    setRender((prev) => !prev);
  }
  return (
    <>
      <ListItem
        key={row.id}
        style={{
          backgroundColor: "white",
          margin: "10px",
          textDecoration: "none",
          listStyle: "none",
          borderRadius: "5px",
        }}
        onClick={(e) => {
          handleClic(e);
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

      {/* <PopOver id={row.id} /> */}
    </>
  );
}
export default CardsDisplay;
