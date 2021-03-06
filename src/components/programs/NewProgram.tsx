import React, { useState } from "react";
import { Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, TextInput } from "components/elements";

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
  // const [days, setDays] = useState<WorkoutRoutine[]>([]);

  const clearAndClose = () => {
    setName("");
    close();
  };

  return (
    <Box padding={2} className={classes.root}>
      <Box>
        <form className={classes.form} noValidate autoComplete="off">
          <TextInput label="Name" onChange={(e) => setName(name)} />
        </form>
        <Grid container className={classes.buttons}>
          <Button
            onClick={async () => {
              clearAndClose();
            }}
          >
            Create
          </Button>
          <Button variant="outline" onClick={clearAndClose}>
            Cancel
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};
