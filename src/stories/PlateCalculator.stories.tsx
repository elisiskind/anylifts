import React from 'react';
import {Meta, Story} from '@storybook/react';
import {PlateCalculator, PlateCalculatorProps} from "../components/workout/PlateCalculator";

export default {
  title: 'components/PlateCalculator',
  component: PlateCalculator
} as Meta;

const Template: Story<PlateCalculatorProps> = (args) => <PlateCalculator {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  weight: 120,
  plates: [45, 35, 10, 10, 10, 5, 2.5, 1.25],
  bar: 45,
};

export const NotEnoughWeight = Template.bind({});
NotEnoughWeight.args = {
  weight: 500,
  plates: [45, 35, 10, 10, 10, 5, 2.5, 1.25],
  bar: 45,
};

export const ImpossibleCombo = Template.bind({});
ImpossibleCombo.args = {
  weight: 100,
  plates: [10, 10, 10],
  bar: 45,
};
