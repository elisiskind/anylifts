import React from "react";
import { Meta, Story } from "@storybook/react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { CreateTemplate } from "components/programs/components/CreateTemplate";

export default {
  title: "programs/CreateTemplate",
  component: CreateTemplate,
} as Meta;

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({}));

const Template: Story = () => {
  const classes = useStyles();

  return (
    <CreateTemplate
      save={async (sets) => console.log("Saving sets: " + JSON.stringify(sets))}
    />
  );
};

export const Primary = Template.bind({});
