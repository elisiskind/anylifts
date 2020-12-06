import React from 'react';
import { Story, Meta } from '@storybook/react';

import { WaButton, WaButtonProps } from '../components/elements/WaButton';

export default {
  title: 'elements/WaButton',
  component: WaButton
} as Meta;

const Template: Story<WaButtonProps> = (args) => <WaButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  outline: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  label: 'Button',
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  color: 'secondary',
  outline: true,
  label: 'Button',
};

