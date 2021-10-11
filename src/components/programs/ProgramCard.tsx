import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Header, Paper, Subtitle } from "components/elements";
import { Program } from "store/Models";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  program: {
    width: "calc((100% - " + spacing(2) + "px) / 3)",
  },
}));

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.program}>
      <Header variant={"h2"}>{program.name}</Header>
      <Subtitle>{program.routines.length} day program</Subtitle>
    </Paper>
  );
};
