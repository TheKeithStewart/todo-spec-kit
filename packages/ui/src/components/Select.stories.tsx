import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
];

export const Default: Story = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Country',
    options: countries,
    defaultValue: 'us',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Timezone',
    options: [
      { label: 'Pacific Time (PT)', value: 'pt' },
      { label: 'Mountain Time (MT)', value: 'mt' },
      { label: 'Central Time (CT)', value: 'ct' },
      { label: 'Eastern Time (ET)', value: 'et' },
    ],
    helperText: 'Select your local timezone',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countries,
    error: 'Please select a country',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countries,
    defaultValue: 'us',
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Priority',
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
      { label: 'Critical (Unavailable)', value: 'critical', disabled: true },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Country',
    options: countries,
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};
