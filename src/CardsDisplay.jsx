import { ListItem } from "@mui/material";
import { cardDelete } from "./API";
import { useState } from "react";

import { IconButton } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
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
      <div style={{ display: "flex" }}>
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
          {row.name}
        </ListItem>
        <IconButton
          onClick={() => {
            handleCardDelete(row.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </>
  );
}
export default CardsDisplay;
