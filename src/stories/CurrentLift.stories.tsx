import React from 'react';
import {Meta, Story} from '@storybook/react';

import {CurrentLift, CurrentLiftProps} from "../components/workout/CurrentLift";
import {Grid} from "@material-ui/core";

export default {
  title: 'components/CurrentLift',
  component: CurrentLift
} as Meta;

const Template: Story<CurrentLiftProps> = (args) => <Grid container justify={"center"}>
  <Grid xs={12} sm={10} md={6}>
    <CurrentLift {...args} />
  </Grid>
</Grid>

export const Primary = Template.bind({});
Primary.args = {
  name: 'Bench Press',
  reps: 10,
  weight: 112.5,
  bar: 45,
  plates: [1.25, 2.5, 5, 10, 10, 10, 35, 45]
};
