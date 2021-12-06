import React from "react";
import { Meta, Story } from "@storybook/react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Grid } from "@material-ui/core";

type Colors =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";

interface SwatchProps {
  color: Colors;
}

const useStyles = makeStyles(({ palette }: Theme) => ({
  swatch: {
    margin: "5px",
    fontFamily: "sans-serif",
    borderRadius: "20px",
  },
  solidSwatch: {
    color: (props: SwatchProps) => palette[props.color].contrastText,
    backgroundColor: (props: SwatchProps) => palette[props.color].main,
    padding: "30px",
  },
  outlineSwatch: {
    color: (props: SwatchProps) => palette[props.color].main,
    backgroundColor: "white",
    border: (props: SwatchProps) => "3px solid " + palette[props.color].main,
    padding: "27px",
  },
}));

const Swatch = (props: SwatchProps) => {
  const classes = useStyles(props);
  return (
    <Grid container>
      <Grid item container xs={6}>
        <Grid
          item
          xs={12}
          className={`${classes.solidSwatch} ${classes.swatch}`}
        >
          {props.color}
        </Grid>
      </Grid>
      <Grid item container xs={6}>
        <Grid
          item
          xs={12}
          className={`${classes.outlineSwatch} ${classes.swatch}`}
        >
          {props.color}
        </Grid>
      </Grid>
    </Grid>
  );
};

const Swatches = () => {
  const colors: Colors[] = [
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
  ];
  return (
    <div>
      {colors.map((value) => {
        return <Swatch color={value} key={value} />;
      })}
    </div>
  );
};

export default {
  title: "style/Palette",
  component: Swatches,
} as Meta;

const Template: Story = () => <Swatches />;

export const Primary = Template.bind({});
Primary.args = {};
