import React, { useContext, useState } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "components/elements";
import { Program } from "store/Models";
import { StorageContext } from "store/StorageProvider";

interface ProgramEditorProps {
  program: Program;
  close: () => void;
}

export const ProgramEditor = ({ program, close }: ProgramEditorProps) => {
  const { editProgram } = useContext(StorageContext);

  const [newProgram, setNewProgram] = useState<Program>(program);
  const [loading, setLoading] = useState<boolean>(false);

  const save = () => {
    setLoading(true);
    //to do
    editProgram().then(() => {
      setLoading(false);
      close();
    });
  };

  if (loading) {
    return <div>Loading!!!!</div>;
  }

  return (
    <div>
      <TextField
        value={newProgram.name}
        label={"name"}
        id={"name"}
        onChange={(v) => {
          setNewProgram({ ...newProgram, ...{ name: v.target.value } });
        }}
      />
      <Button onClick={save}>Save</Button>
    </div>
  );
};
