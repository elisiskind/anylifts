import React from "react";
import { Meta, Story } from "@storybook/react";
import { Paper } from "components/elements/Paper";
import { Grid } from "@material-ui/core";
import { Button } from "components/elements/Button";

export default {
  title: "components/AlPaper",
  component: Paper,
} as Meta;

const Template: Story = () => (
  <Paper>
    Content goes here
    <Grid container>
      <Grid item>
        <Button>Great</Button>
      </Grid>
      <Grid item>
        <Button variant="outline">Oh no!</Button>
      </Grid>
      <Grid item>
        <Button variant="outline">Help!</Button>
      </Grid>
    </Grid>
  </Paper>
);

export const Primary = Template.bind({});
