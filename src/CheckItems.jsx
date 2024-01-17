import { Button } from "@mui/material";
import CheckBox from "./checkbox";
import { useEffect, useState } from "react";
import Inputci from "./inputci";

function CheckItems(props) {
  let { row, addci } = props;
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
            //   maxWidth: "370%",
            minHeight: "100px",
            maxWidth: "100px",
          }}
        >
          {row.name}
          {checkItems.map((ro) => {
            let name = ro["name"];
            return <CheckBox name={name} />;
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
