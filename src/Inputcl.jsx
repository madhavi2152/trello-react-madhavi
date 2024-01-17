import { useRef, useState } from "react";
import { AddChecklist } from "./API";
function Inputcl(props) {
  let { id, addData } = props;
  let [op, setOp] = useState("");
  function handleInput(e) {
    // op = e.target.value;
    setOp(e.target.value);
    console.log(op);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const fun = async () => {
      let temp = await AddChecklist(id, op);
      addData(temp);
      console.log(temp);
    };
    fun();
    setOp("");
  }
  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          backgroundColor: "white",
          border: "0.2px solid gray",
          padding: "10px",
          margin: "5px",
        }}
      >
        <input
          type="text"
          value={op}
          onChange={(e) => {
            handleInput(e);
          }}
        ></input>
        <button type="submit">submit</button>
      </form>
    </>
  );
}
export default Inputcl;
