import React, {useEffect, useState} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {AlButton} from "./AlButton";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(({palette, spacing}: Theme) => ({
  timeBox: {
    border: '2px solid ' + palette.grey.A100,
    backgroundColor: "white",
    letterSpacing: '5px',
    fontWeight: 700,
    boxShadow: 'inset 0 4px ' + palette.grey[100],
    width: '250px',
    textAlign: "center",
    height: '52px',
    fontSize: '20px',
  },
  timeDisplay: {
    fontSize: '32px',
    color: (negative: boolean) => negative ? palette.error.main : 'black'
  },
  totalTimeDisplay: {
    marginLeft: '5px',
    color: palette.grey[700]
  },
  adjustButton: {
    margin: '-5px'
  }
}))

const displayTime = (value: number) => {
  const minutes = Math.floor(Math.abs(value) / 60).toString().padStart(2, '0');
  const seconds = (Math.abs(value) % 60).toString().padStart(2, '0');
  return (value < 0 ? '-' : '') + minutes + ':' + seconds;
}

export interface AlTimerProps {
  time: number;
  addTime: (time: number) => void;
  onFinish: () => void;
}

export const AlTimer = ({time, onFinish, addTime}: AlTimerProps) => {
  const [elapsed, setElapsed] = useState<number>(0)
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [completed, setCompleted] = useState<boolean>(false)

  const createTimer = () => {
    const start = Date.now()
    return setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 500)
  }

  useEffect(() => {
    setTimer(createTimer())
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    }
  }, [timer])


  const value = time - elapsed
  if (value <= 0 && !completed) {
    onFinish();
    setCompleted(true)
  } else if (value > 0 && completed) {
    setCompleted(false)
  }

  const classes = useStyles(value < 0)

  return <Grid>
    <Grid container>
      <Grid>
        <AlButton onClick={() => addTime(-15)} flatRight>
          <Typography className={classes.adjustButton}>
            - 15
          </Typography>
        </AlButton>
      </Grid>
      <Grid item>
        <Box className={classes.timeBox} display='flex' alignItems='center' justifyContent={'center'}>
          <Typography component={"span"} className={classes.timeDisplay}>
            {displayTime(value)}
          </Typography>
          <Typography component={"span"} className={classes.totalTimeDisplay}>
            {' / ' + displayTime(time)}
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <AlButton onClick={() => addTime(15)} flatLeft>
          <Typography className={classes.adjustButton}>
            + 15
          </Typography>
        </AlButton>
      </Grid>
    </Grid>
  </Grid>
}