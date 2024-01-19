import { Button, Paper, Popover } from "@mui/material";
import { FetchChecklist } from "./API";
import { useEffect, useReducer, useState } from "react";
import reducer from "./Reducer";
import Inputcl from "./Inputcl";
import CloseIcon from "@mui/icons-material/Close";
import CheckItems from "./CheckItems";
function Checklist(props) {
  let { id } = props;
  let [show, dispatch] = useReducer(reducer, { display: false });
  let [cldata, dispatchCldata] = useReducer(reducer, []);
  let [showInput, dispatchShowInput] = useReducer(reducer, { display: false });
  useEffect(() => {
    const fun = async () => {
      let temp = await FetchChecklist(id);
      dispatchCldata({ type: "initial", payload: temp });
      console.log(cldata);
    };
    fun();
  }, []);

  function handleAdd() {
    dispatchShowInput({ type: "showInput" });
  }
  function handlechecklist(temp) {
    dispatchCldata({ type: "handleCl", temp: temp });
  }
  function handleCheckItems(id, temp) {
    dispatchCldata({ type: "updatecl", temp: temp, id: id });
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
                    dispatchCldata({ type: "deletecl", id: id });
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
                dispatch({ type: show });
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
                  dispatchShowInput({ type: showInput });
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
