import { useState } from "react";
import { CreateBoard } from "./API";
function BoardInput(props) {
  let { addData } = props;
  let [showform, setShowform] = useState(false);
  let [value, setValue] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const fun = async () => {
      let temp = await CreateBoard(value);
      addData(temp);
    };
    console.log(value);
    fun(value);
    setValue("");
    setShowform(false);
  }
  return (
    <>
      <div
        style={{
          width: "400px",
          height: "100px",
          marginLeft: "250px",
          position: "absolute",
          zIndex: "3",
          paddingTop: "5px",
        }}
      >
        <button
          style={{
            backgroundColor: "blue",
            width: "200px",
            height: "50px",
            color: "white",
            border: "1px solid white",
            boxShadow: "0 0 10px white",
            fontSize: "Large",
          }}
          onClick={() => {
            setShowform((prev) => !prev);
          }}
        >
          create board
        </button>
        {showform && (
          <>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              style={{ height: "30px" }}
            >
              <input
                type="text"
                value={value}
                placeholder="enter board name"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                style={{
                  margin: "5px",
                  height: "50px",
                  border: "none",
                  borderRadius: "3px",
                  boxShadow: "0 1px 10px black",
                }}
              ></input>
              <button
                type="submit"
                style={{
                  backgroundColor: "lightblue",
                  color: "black",
                  fontSize: "large",
                  border: "none",
                  boxShadow: "0 1px 10px black",
                }}
              >
                +
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
export default BoardInput;
