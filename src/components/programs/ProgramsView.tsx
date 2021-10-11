import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { Button } from "components/elements";
import { NewProgram, ProgramCard, ProgramEditor } from "components/programs";
import { Modal } from "@material-ui/core";
import { StorageContext } from "store/StorageProvider";
import { Program } from "store/Models";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(3),
  },
  programs: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing(1),
    padding: spacing(2),
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
  const { programs, loading } = useContext(StorageContext);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [programToEdit, setProgramToEdit] = useState<Program | null>(null);

  const createNewProgram = () => {
    setNewModalOpen(true);
  };

  const editProgram = (program: Program) => {
    setProgramToEdit(program);
    setEditModalOpen(true);
  };

  const classes = useStyles();

  return (
    <>
      <Modal open={newModalOpen} onClose={() => setNewModalOpen(false)}>
        <NewProgram close={() => setNewModalOpen(false)} />
      </Modal>
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <ProgramEditor
          program={programToEdit!}
          close={() => setEditModalOpen(false)}
        />
      </Modal>
      <div className={classes.root}>
        {!loading && programs && (
          <div className={classes.programs}>
            {programs.map((program) => (
              <div onClick={() => editProgram(program)}>
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        )}
        <div className={classes.fab}>
          <Button onClick={createNewProgram} color="secondary">
            <Add className={classes.addIcon} /> Create
          </Button>
        </div>
      </div>
    </>
  );
};
