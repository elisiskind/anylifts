import React from "react";
import { Meta, Story } from "@storybook/react";
import { Paper } from "components/elements/Paper";
import { Button } from "components/elements/Button";
import { makeStyles, Theme } from "@material-ui/core/styles";

export default {
  title: "elements/Paper",
  component: Paper,
} as Meta;

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  buttons: {
    display: "flex",
    alignItems: "center",
    gap: spacing(2),
    marginTop: spacing(3),
  },
}));

const Template: Story = () => {
  const classes = useStyles();

  return (
    <Paper>
      Content goes here
      <div className={classes.buttons}>
        <Button>Great</Button>
        <Button variant="outline">Oh no!</Button>
        <Button variant="outline">Help!</Button>
      </div>
    </Paper>
  );
};

export const Primary = Template.bind({});
