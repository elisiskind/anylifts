import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Swatches} from "./Swatch";
import {WaPaper} from "../components/elements/WaPaper";
import {Grid} from "@material-ui/core";
import {WaButton} from "../components/elements/WaButton";

export default {
  title: 'components/WaPaper',
  component: WaPaper
} as Meta;

const Template: Story = () => <WaPaper>
  Content goes here
  <Grid container>
    <Grid item>
      <WaButton label={'Great'}/>
    </Grid>
    <Grid item>
      <WaButton label={'Oh no'} outline/>
    </Grid>
    <Grid item>
      <WaButton label={'Help'} outline/>
    </Grid>
  </Grid>
</WaPaper>;

export const Primary = Template.bind({});