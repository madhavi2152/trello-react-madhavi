import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function CheckBox(props) {
  let { name } = props;
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label={name} />
    </FormGroup>
  );
}
export default CheckBox;
