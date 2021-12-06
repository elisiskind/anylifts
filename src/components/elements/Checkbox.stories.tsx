import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Checkbox, CheckboxProps } from "components/elements/Checkbox";

export default {
  title: "elements/Checkbox",
  component: Checkbox,
} as Meta;

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing(2),
  },
}));

const Template: Story<CheckboxProps> = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<boolean>(false);

  const onChange = (checked: boolean) => setChecked(checked);

  return (
    <div className={classes.root}>
      <Checkbox
        value={checked}
        label={props.label ?? "Checkbox"}
        onChange={onChange}
        color={props.color}
      />
      {checked ? "Checkbox is checked!" : "Checkbox is unchecked :("}
    </div>
  );
};

export const Primary = Template.bind({});
