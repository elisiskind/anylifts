import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { Button, Header, Paper, Subtitle } from "components/elements";
import { NewProgram } from "components/programs";
import { Programs } from "state/HardcodedDataSource";
import { Box, Grid, Modal } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(3),
  },
  fab: {
    position: "fixed",
    right: spacing(4),
    bottom: spacing(4),
  },
  addIcon: {
    fontStyle: "bold",
    fontSize: 16,
    marginRight: 4,
  },
}));

export const ProgramsView = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const createNewProgam = () => {
    setModalOpen(true);
  };
  const classes = useStyles();

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <NewProgram close={() => setModalOpen(false)} />
      </Modal>
      <Box className={classes.root}>
        <Grid container spacing={3}>
          {Programs.map((program) => {
            return (
              <Grid item xs={12} sm={6}>
                <Paper>
                  <Header variant={"h2"}>{program.name}</Header>
                  <Subtitle>{program.routines.length} day program</Subtitle>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Box className={classes.fab}>
          <Button onClick={createNewProgam} color="secondary">
            <Add className={classes.addIcon} /> Create
          </Button>
        </Box>
      </Box>
    </>
  );
};
