import * as React from "react";
import { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Divider, Paper, TextInput } from "components/elements";
import { Checkbox } from "components/elements/Checkbox";
import { NumberInput } from "components/elements/NumberInput";
import { SetData } from "store/Entities";

const editTemplateStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
  },
  numberInput: {
    width: "150px",
  },
}));

interface NewSet {
  reps?: number;
  mode?: "percent" | "absolute";
  weight?: number;
  amrap?: boolean;
  sets?: number;
}

interface EditSetProps {
  set: NewSet;
  editReps: (reps: number) => void;
  editMode: (useAbsolute: boolean) => void;
  editWeight: (weight: number) => void;
  editAmrap: (amrap: boolean) => void;
  editSets: (sets?: number) => void;
}

const EditSet = ({
  editAmrap,
  editMode,
  editReps,
  editSets,
  editWeight,
  set,
}: EditSetProps) => {
  const classes = editTemplateStyles();
  const [showRepsValidation, setShowRepsValidation] = useState<boolean>(false);
  const [showWeightValidation, setShowWeightValidation] = useState<boolean>(
    false
  );
  const [showSetsValidation, setShowSetsValidation] = useState<boolean>(false);

  return (
    <div className={classes.root}>
      <span>
        <NumberInput
          label={"Weight"}
          onChange={editWeight}
          className={classes.numberInput}
          units={set.mode === "percent" ? "%" : "lbs"}
          value={set.weight}
          error={showWeightValidation ? validPositive(set.weight) : " "}
          onBlur={() => setShowWeightValidation(true)}
          min={0}
        />
      </span>
      <span>
        <NumberInput
          label={"Reps"}
          onChange={editReps}
          className={classes.numberInput}
          units={"reps"}
          value={set.reps}
          onBlur={() => setShowRepsValidation(true)}
          error={showRepsValidation ? validOverZero(set.reps) : " "}
          min={1}
        />
      </span>
      <Checkbox onChange={editAmrap} label={"AMRAP"} value={!!set.amrap} />
      <Checkbox
        onChange={editMode}
        label={"Use percentage"}
        value={set.mode === "percent"}
      />
      <Checkbox
        onChange={(value) => editSets(value ? 1 : undefined)}
        label={"Repeat set"}
        value={set.sets !== undefined}
      />
      {set.sets !== undefined && (
        <NumberInput
          label={"Repeat count"}
          onChange={editSets}
          className={classes.numberInput}
          units={"sets"}
          value={set.sets}
          error={showSetsValidation ? validOverZero(set.sets) : " "}
          onBlur={() => setShowSetsValidation(true)}
          min={0}
        />
      )}
    </div>
  );
};

const createTemplateStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export interface CreateTemplateProps {
  save: (sets: SetData[]) => Promise<void>;
}

const validOverZero = (value?: number) => {
  if (value === undefined) {
    return "Enter a number";
  } else if (value <= 0) {
    return "Must be greater than 0";
  } else {
    return " ";
  }
};

const validPositive = (value?: number) => {
  if (value === undefined) {
    return "Enter a number";
  } else if (value < 0) {
    return "Must not be negative";
  } else {
    return " ";
  }
};

export const CreateTemplate = ({ save }: CreateTemplateProps) => {
  const classes = createTemplateStyles();

  const [name, setName] = useState<string>("");
  const [sets, setSets] = useState<NewSet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const editReps = (index: number) => {
    return (reps: number) => {
      const copy = [...sets];
      copy[index].reps = Math.floor(reps);
      setSets(copy);
    };
  };

  const editAmrap = (index: number) => {
    return (amrap: boolean) => {
      const copy = [...sets];
      copy[index].amrap = amrap;
      setSets(copy);
    };
  };

  const editMode = (index: number) => {
    return (useAbsolute: boolean) => {
      const copy = [...sets];
      copy[index].mode = useAbsolute ? "absolute" : "percent";
      setSets(copy);
    };
  };

  const editWeight = (index: number) => {
    return (weight: number) => {
      const copy = [...sets];
      copy[index].weight = Math.floor(weight);
      setSets(copy);
    };
  };

  const editSets = (index: number) => {
    return (numSets?: number) => {
      const copy = [...sets];
      copy[index].sets = numSets ? Math.floor(numSets) : undefined;
      setSets(copy);
    };
  };

  const addSet = () => {
    setSets([...sets, {}]);
  };

  const saveSets = () => {
    setLoading(true);
    save(
      sets.map<SetData>((set) => {
        return {
          id: "",
          reps: set.reps!,
          sets: set.sets,
          amrap: !!set.amrap,
          mode: set.mode ?? "absolute",
          weight: set.weight!,
        };
      })
    )
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  return (
    <Paper className={classes.root}>
      <TextInput label={"Name"} onChange={setName} />
      <Divider />
      {sets.map((t, index) => (
        <>
          <EditSet
            key={"edit-set-" + index}
            editAmrap={editAmrap(index)}
            editMode={editMode(index)}
            editReps={editReps(index)}
            editWeight={editWeight(index)}
            editSets={editSets(index)}
            set={sets[index]}
          />
          <Divider key={"divider-" + index} />
        </>
      ))}
      <div className={classes.buttons}>
        <Button onClick={addSet} variant={"link"}>
          + Add set
        </Button>
        <Button onClick={saveSets}>Save</Button>
      </div>
    </Paper>
  );
};
