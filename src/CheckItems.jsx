import { Button } from "@mui/material";
import CheckBox from "./checkbox";
import { useEffect, useState } from "react";
import Inputci from "./inputci";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { DeleteChecklist } from "./API";

function CheckItems(props) {
  let { row, idcard, addci, DeleteList } = props;
  let [show, setShow] = useState(false);
  let [checkItems, setCheckItems] = useState("");
  useEffect(() => {
    let temp = row["checkItems"];
    setCheckItems(temp);
  }, []);

  function handleClick() {
    setShow((prev) => !prev);
  }
  function handleAddItem(temp) {
    setCheckItems((prev) => [...prev, temp]);
    setShow((prev) => !prev);
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
          <div style={{ display: "flex" }}>
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
                  setCheckItems((prev) => {
                    const updatedItems = [...prev];
                    updatedItems[index] = {
                      ...prev[index],
                      state: val ? "incomplete" : "complete",
                    };
                    return updatedItems;
                  });
                }}
                deleteitem={(id) => {
                  setCheckItems((prevItems) =>
                    prevItems.filter((item) => item.id !== id)
                  );
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
          {show ? (
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
