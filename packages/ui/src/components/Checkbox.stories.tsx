import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Remember me',
    helperText: 'Keep me signed in on this device',
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked option',
    disabled: true,
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Group: Story = {
  render: () => (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Select features:</h3>
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="Push notifications" />
      <Checkbox label="SMS notifications" helperText="Standard messaging rates apply" />
      <Checkbox label="Weekly digest" defaultChecked />
    </div>
  ),
};
