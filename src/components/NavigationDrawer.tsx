import React from 'react';
import {List} from "@material-ui/core";
import {FitnessCenter, PlaylistPlay} from "@material-ui/icons";
import {ListItemLink} from "./ListItemLink";

export const NavigationDrawer = () => {
  return <div>
    <List component="nav">
      <ListItemLink to="/programs" primary={'My Programs'} icon={<PlaylistPlay/>}/>
      <ListItemLink to="/exercises" primary={'My Exercises'} icon={<FitnessCenter/>}/>
      <ListItemLink to="/equipment" primary={'Edit Equipment'} icon={<FitnessCenter/>}/>
    </List>
  </div>
};