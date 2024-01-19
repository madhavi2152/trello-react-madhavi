import { Button } from "@mui/material";
import CheckBox from "./checkbox";
import { useEffect, useReducer, useState } from "react";
import Inputci from "./inputci";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import reducer from "./Reducer";
import { DeleteChecklist } from "./API";

function CheckItems(props) {
  let { row, idcard, addci, DeleteList } = props;
  let [showci, dispatchShowci] = useReducer(reducer, false);
  let [checkItems, dispatchCheckItems] = useReducer(reducer, []);
  useEffect(() => {
    let temp = row["checkItems"];
    dispatchCheckItems({ type: "initialci", temp: temp });
  }, []);

  function handleClick() {
    dispatchShowci({ type: "showci" });
  }
  function handleAddItem(temp) {
    dispatchCheckItems({ type: "updateci", temp: temp });
    // setCheckItems((prev) => [...prev, temp]);
    dispatchShowci({ type: "hide" });
    addci(checkItems.id, temp);
  }
  return (
    checkItems && (
      <>
        <div
          style={{
            backgroundColor: "beige",
            padding: "10px",
            borderRadius: "10px",
            margin: "10px",
            minWidth: "340%",
            minHeight: "100px",
            maxWidth: "100px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {row.name}
            <IconButton
              onClick={() => {
                let listid = row.id;
                DeleteList(listid);
                DeleteChecklist(idcard, listid);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          {checkItems.map((ro, index) => {
            let name = ro["name"];
            return (
              <CheckBox
                name={name}
                idcard={idcard}
                checkid={ro.id}
                checked={() => {
                  return ro["state"] === "complete";
                }}
                togglecheck={(val) => {
                  console.log(checkItems[index]);
                  dispatchCheckItems({
                    type: "toggleci",
                    val: val,
                    index: index,
                  });
                }}
                deleteitem={(id) => {
                  dispatchCheckItems({ type: "deleteci", id: id });
                }}
              />
            );
          })}
          <br></br>
          <Button
            onClick={() => {
              handleClick();
            }}
          >
            {" "}
            add check item
          </Button>
          {showci ? (
            <Inputci id={row.id} Additem={(value) => handleAddItem(value)} />
          ) : (
            ""
          )}
        </div>
      </>
    )
  );
}
export default CheckItems;
