import { Button, Paper, Popover } from "@mui/material";
import { FetchChecklist } from "./API";
import { useEffect, useState } from "react";
import Inputcl from "./Inputcl";
import CheckItems from "./CheckItems";
function Checklist(props) {
  let { id } = props;
  let [cldata, setCldata] = useState([]);
  let [showInput, setShowInput] = useState(false);
  useEffect(() => {
    const fun = async () => {
      let temp = await FetchChecklist(id);
      setCldata(temp);
      console.log(cldata);
    };
    fun();
  }, []);

  function handleAdd() {
    setShowInput((prev) => !prev);
  }
  function handlechecklist(temp) {
    setCldata((prev) => [...prev, temp]);
  }
  function handleCheckItems(id, temp) {
    setCldata((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, checkItems: [...item.checkItems, temp] }
          : item
      )
    );
  }
  return (
    cldata && (
      <>
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            width: "700px",
            minHeight: "600px",
            height: "fit-content",
            border: "3px solid gray",
            borderRadius: "10px",
            position: "absolute",
            boxShadow: "20px 20px 50px black",
            top: "25%",
            left: "35%",
            zIndex: "1",
            // bottom: "50px",
          }}
        >
          <div>
            {cldata.map((row) => (
              <CheckItems
                row={row}
                addci={(id, val) => {
                  handleCheckItems(id, val);
                }}
              />
            ))}
          </div>

          <div
            style={{
              //   position: "sticky",
              backgroundColor: "#ccc",
              borderLeft: "5px solid black",
              width: "30%",
              //   height: "600px",
              //   height: "fit-content",
              float: "right",
              marginLeft: "55%",
              //   right: "0%",
            }}
          >
            <Button
              sx={{
                textDecoration: "none",
                color: "black",
                backgroundColor: "white",
                marginTop: "100%",
                marginLeft: "10%",
              }}
              onClick={handleAdd}
            >
              create CheckList
            </Button>
            {showInput && (
              <Inputcl
                id={id}
                addData={(temp) => {
                  handlechecklist(temp);
                }}
              />
            )}
          </div>
        </div>
      </>
    )
  );
}
export default Checklist;
