import React from 'react';
import { Story, Meta } from '@storybook/react';

import { AlButton, AlButtonProps } from '../../components/elements/AlButton';

export default {
  title: 'elements/AlButton',
  component: AlButton
} as Meta;

interface AlButtonStoryProps extends AlButtonProps {
  label: string
}

const Template: Story<AlButtonStoryProps> = (args) => {
  const onclick = () => {
    console.log('hello')
  }
  return <div>
    <AlButton {...args} onClick={onclick} >
      {args.label}
    </AlButton>
  </div>
}

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

