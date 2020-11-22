import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {FitnessCenter, PlaylistPlay} from "@material-ui/icons";
import {ListItemLink} from "./ListItemLink";

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  button: {
    background: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: 5,
    width: '100%',
    color: theme.palette.primary.contrastText,
    textAlign: 'center'
  },
}));


export const NavigationDrawer = () => {
  const classes = useStyles();
  return <div>
    <List component="nav">
      <ListItemLink to="/programs" primary={'My Programs'} icon={<PlaylistPlay/>}/>
      <ListItemLink to="/exercises" primary={'My Programs'} icon={<FitnessCenter/>}/>
      <ListItemLink to="/weights" primary={'My Programs'} icon={<FitnessCenter/>}/>
    </List>
  </div>
};