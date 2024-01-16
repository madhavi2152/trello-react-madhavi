import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
import TopMenu from "./TopMenu";
import SideMenu from "./mainmenu";
import Boards from "./Boards";
import Lists from "./Lists";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopMenu />
              <Grid container>
                <Grid item xs={3}>
                  <SideMenu />
                </Grid>
                <Grid item>
                  <Boards />
                </Grid>
              </Grid>
            </>
          }
        />
        <Route
          path="/lists/:id"
          element={
            <>
              <TopMenu />
              <Grid container>
                <Grid item xs={3}>
                  <SideMenu />
                </Grid>
                <Grid item xs={5}>
                  <Lists />
                </Grid>
              </Grid>
            </>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
