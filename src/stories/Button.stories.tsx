import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: Button
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

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
  secondary: true,
  label: 'Button',
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  secondary: true,
  outline: true,
  label: 'Button',
};

