import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function PopOver(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idt = open ? "simple-popover" : undefined;

  let { id } = props.id;
  return (
    <Popover
      id={idt}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2 }}>
        <CheckLists id={id} />
      </Typography>
    </Popover>
  );
}
export default PopOver;
