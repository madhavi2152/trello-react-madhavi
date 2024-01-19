import { Button, Paper, Popover } from "@mui/material";
import { FetchChecklist } from "./API";
import { useEffect, useState } from "react";
import Inputcl from "./Inputcl";
import CloseIcon from "@mui/icons-material/Close";
import CheckItems from "./CheckItems";
function Checklist(props) {
  let { id } = props;
  let [show, setShow] = useState(true);
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
            display: show ? "flex" : "none",
            backgroundColor: "white",
            width: "750px",
            minHeight: "600px",
            height: "fit-content",
            border: "3px solid gray",
            borderRadius: "10px",
            position: "absolute",
            boxShadow: "20px 20px 50px black",
            top: "25%",
            zIndex: "1",
          }}
        >
          <div>
            {cldata.length > 0 ? (
              cldata.map((row, index) => (
                <CheckItems
                  row={row}
                  idcard={row.idCard}
                  addci={(id, val) => {
                    handleCheckItems(id, val);
                  }}
                  const
                  DeleteList={(id) => {
                    setCldata((prev) =>
                      [...prev].filter((item) => item.id !== id)
                    );
                  }}
                />
              ))
            ) : (
              <div
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  margin: "10px",
                  width: "100px",
                  minHeight: "100px",
                }}
              ></div>
            )}
          </div>

          <div
            style={{
              backgroundColor: "#ccc",
              borderLeft: "5px solid black",
              width: "40%",
              float: "right",
              marginLeft: "55%",
            }}
          >
            <CloseIcon
              onClick={() => {
                setShow(false);
              }}
              style={{ float: "right" }}
            />
            <Button
              sx={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "blue",
                marginTop: "100%",
                marginLeft: "10%",
                borderRadius: "10px",
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
                  setShowInput(false);
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
