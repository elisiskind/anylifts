import React from 'react';
import {Box, Fab} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Add} from "@material-ui/icons";

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
    <Fab name={'create'} className={classes.fab} onClick={createNewProgam} color="secondary" variant="extended">
      <Add/>
      Create
    </Fab>
  </Box>
}