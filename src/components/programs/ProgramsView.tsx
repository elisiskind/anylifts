import React from 'react';
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Add} from "@material-ui/icons";
import {AlButton} from "../elements/AlButton";

const useStyles = makeStyles(theme => ({
  root: {},
  fab: {
    position: 'fixed',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  }
}));

export const ProgramsView = () => {

  const createNewProgam = () => {
    console.log('Creating new!')
  }
  const classes = useStyles();

  return <Box className={classes.root}>
    Programs!
    <Box className={classes.fab}>
      <AlButton onClick={createNewProgam} color="secondary">
        <Add/> Create
      </AlButton>
    </Box>
  </Box>
}