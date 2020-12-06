import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Swatches} from "./Swatch";

export default {
  title: 'style/Palette',
  component: Swatches
} as Meta;

const Template: Story = () => <Swatches/>;

export const Primary = Template.bind({});
Primary.args = {
};