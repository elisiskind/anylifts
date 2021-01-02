import React from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const ProgramCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/*<CardActionArea>*/}
      {/*  <CardContent>*/}
      {/*    <Typography gutterBottom color="textPrimary" variant="h5" component="h2">*/}
      {/*      {program.name}*/}
      {/*    </Typography>*/}
      {/*    <Typography variant="body2" color="textSecondary" component="p">*/}
      {/*      {program.routines.length} routines*/}
      {/*    </Typography>*/}
      {/*  </CardContent>*/}
      {/*</CardActionArea>*/}
    </Card>
  );
};