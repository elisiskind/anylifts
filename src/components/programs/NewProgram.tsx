import React from "react";
import {TextField} from "@material-ui/core";

const EnterName = () => {
  return <form noValidate autoComplete="off">
    <TextField id="outlined-basic" label="Program Name" variant="outlined"/>
  </form>
}

export const NewProgram = () => {
  return <EnterName/>
}