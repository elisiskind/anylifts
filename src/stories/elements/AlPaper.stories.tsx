import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AlPaper} from "../../components/elements/AlPaper";
import {Grid} from "@material-ui/core";
import {AlButton} from "../../components/elements/AlButton";

export default {
  title: 'components/AlPaper',
  component: AlPaper
} as Meta;

const Template: Story = () => <AlPaper>
  Content goes here
  <Grid container>
    <Grid item>
      <AlButton>Great</AlButton>
    </Grid>
    <Grid item>
      <AlButton outline>Oh no!</AlButton>
    </Grid>
    <Grid item>
      <AlButton outline>Help!</AlButton>
    </Grid>
  </Grid>
</AlPaper>;

export const Primary = Template.bind({});