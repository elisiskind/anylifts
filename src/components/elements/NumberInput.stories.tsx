import React from "react";
import { Meta, Story } from "@storybook/react";
import { Paper } from "components/elements/Paper";
import { Button } from "components/elements/Button";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextInput } from "components/elements/TextInput";
import { NumberInput } from "components/elements/NumberInput";

export default {
  title: "elements/NumberInput",
  component: NumberInput,
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
        <NumberInput label={"Name"} onChange={console.log} />
      </div>
    </Paper>
  );
};

export const Primary = Template.bind({});
