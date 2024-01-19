import { useState } from "react";
import { AddCheckitem } from "./API";
function Inputci(props) {
  let { id, Additem } = props;
  let [val, setVal] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const fun = async () => {
      let temp = await AddCheckitem(id, val);
      Additem(temp);
      console.log(temp);
      setVal("");
    };
    fun();
    console.log(val);
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={val}
          placeholder="enter name"
          onChange={(e) => setVal(e.target.value)}
          style={{
            borderRadius: "5px",
            height: "24px",
            border: "white",
            boxShadow: "0 5px 11px 5px #ccc",
          }}
        ></input>
        <button
          type="submit"
          style={{
            marginLeft: "5px",
            borderRadius: "5px",
            height: "24px",
            backgroundColor: "blue",
            color: "white",
            border: "white",
            boxShadow: "0 5px 11px 5px #ccc",
          }}
        >
          {" "}
          submit
        </button>
      </form>
    </>
  );
}
export default Inputci;
