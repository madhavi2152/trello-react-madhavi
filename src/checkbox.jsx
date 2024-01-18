import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Togglecheck, DeleteCheckItem } from "./API";
import { IconButton } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
function CheckBox(props) {
  const { name, checkid, idcard, checked, togglecheck, deleteitem } = props;
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    let val = checked();
    setIsChecked(val);
  }, []);
  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    togglecheck(isChecked);
    let state = isChecked ? "incomplete" : "complete";
    console.log(idcard, checkid);
    Togglecheck(idcard, checkid, state);
  };
  const handleDelete = () => {
    deleteitem(checkid);
    DeleteCheckItem(idcard, checkid);
  };
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <>
            <Checkbox checked={checked()} onChange={handleCheckboxChange} />
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        }
        label={name}
      />
    </FormGroup>
  );
}

export default CheckBox;
