import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import axios from "axios";
function Boards() {
  let boardname = React.useRef("");
  let [selectval, setSelectval] = React.useState("");
  function handleOnClick() {}

  const handleSubmit = async (e) => {
    e.preventDefault();
    boardname.current = selectval;
    console.log(boardname);
    if (boardname.current !== "") {
      try {
        const response = await axios.post(
          `https://api.trello.com/1/boards?name=${boardname.current}&key=b1e11150704299adce969ca411c9a318&token=ATTA840f4d019464c03623eca59a0a7bdda26e3ea34cc0a54c7abd00880be8a4614dFFEE1CA4`
        );
        setSelectval("");
        boardname.current = "";
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ zIndex: "1", position: "relative" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <form
              style={{ height: "100px", width: "400px" }}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                // ref={boardname}
                value={selectval}
                placeholder="enter board name"
                onClick={handleOnClick}
                onChange={(e) => setSelectval(e.target.value)}
              ></input>
              <button type="submit">Submit</button>
            </form>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Boards;
