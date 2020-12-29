import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { AlButton } from "../elements/AlButton";
import Modal from "@material-ui/core/Modal";
import { NewProgram } from "./NewProgram";
import { AlPaper } from "../elements/AlPaper";
import { AlDivider } from "../elements/AlDivider";

const useStyles = makeStyles((theme) => ({
  root: {},
  fab: {
    position: "fixed",
    right: theme.spacing(4),
    bottom: theme.spacing(4),
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
        <AlPaper>
          <Box>Program 1</Box>
          <AlDivider />
          <Box>Program 2</Box>
        </AlPaper>
        <Box className={classes.fab}>
          <AlButton onClick={createNewProgam} color="secondary">
            <Add className={classes.addIcon} /> Create
          </AlButton>
        </Box>
      </Box>
    </>
  );
};