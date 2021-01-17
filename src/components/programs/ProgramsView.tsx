import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { AlButton } from "../elements/AlButton";
import Modal from "@material-ui/core/Modal";
import { NewProgram } from "./NewProgram";
import { AlPaper } from "../elements/AlPaper";
import Grid from "@material-ui/core/Grid";
import { Programs } from "../../state/HardcodedDataSource";
import {AlHeader} from "../elements/AlHeader";
import {AlSubtitle} from "../elements/AlSubtitle";

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
                <AlPaper>
                  <AlHeader variant={"h2"}>{program.name}</AlHeader>
                  <AlSubtitle>
                    {program.routines.length} day program
                  </AlSubtitle>
                </AlPaper>
              </Grid>
            );
          })}
        </Grid>
        <Box className={classes.fab}>
          <AlButton onClick={createNewProgam} color="secondary">
            <Add className={classes.addIcon} /> Create
          </AlButton>
        </Box>
      </Box>
    </>
  );
};