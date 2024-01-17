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
        ></input>
        <button type="submit"> submit</button>
      </form>
    </>
  );
}
export default Inputci;
