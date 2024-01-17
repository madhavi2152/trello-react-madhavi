import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

function CheckLists(props) {
  let id = props.id;
  console.log(id);
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: "60px",
  }));

  const lightTheme = createTheme({ palette: { mode: "light" } });

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} key={0}>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr" },
              gap: 2,
            }}
          >
            <Item key={16} elevation={16} sx={{ width: "50px" }}>
              {<p>hi</p>}
            </Item>
          </Box>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
export default CheckLists;
