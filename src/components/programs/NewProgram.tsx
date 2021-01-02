import React, { useState } from "react";
import { Box, Theme } from "@material-ui/core";
import { AlButton } from "../elements/AlButton";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { WorkoutRoutine } from "./Program";
import Grid from "@material-ui/core/Grid";

export interface NewProgramProps {
  close: () => void;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    width: "80%",
    backgroundColor: "white",
    margin: "20% auto",
    padding: spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
  form: {
    padding: spacing(1),
  },
}));

export const NewProgram = ({ close }: NewProgramProps) => {
  const classes = useStyles();

  const [name, setName] = useState<string>("");
  const [days, setDays] = useState<WorkoutRoutine[]>([]);

  const clearAndClose = () => {
    setName("");
    close();
  };

  return (
    <Box padding={2} className={classes.root}>
      <Box>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <Grid container className={classes.buttons}>
          <AlButton
            onClick={async () => {
              clearAndClose();
            }}
          >
            Create
          </AlButton>
          <AlButton outline onClick={clearAndClose}>
            Cancel
          </AlButton>
        </Grid>
      </Box>
    </Box>
  );
};