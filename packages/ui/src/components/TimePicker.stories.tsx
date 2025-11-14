import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TimePicker from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

function TimePickerWrapper(props: Partial<React.ComponentProps<typeof TimePicker>>) {
  const [value, setValue] = useState<string | undefined>(props.value);

  return (
    <div className="w-80">
      <TimePicker value={value} onChange={setValue} {...props} />
    </div>
  );
}

export const Default: Story = {
  render: () => <TimePickerWrapper label="Select Time" />,
};

export const WithValue: Story = {
  render: () => <TimePickerWrapper label="Meeting Time" value="14:30" />,
};

export const TwelveHourFormat: Story = {
  render: () => <TimePickerWrapper label="Appointment Time" value="14:30" use12Hour />,
};

export const FifteenMinuteInterval: Story = {
  render: () => <TimePickerWrapper label="Check-in Time" interval={15} />,
};

export const SixtyMinuteInterval: Story = {
  render: () => <TimePickerWrapper label="Hourly Slot" interval={60} />,
};

export const WithError: Story = {
  render: () => <TimePickerWrapper label="Start Time" error="Please select a time" value="09:00" />,
};

export const Disabled: Story = {
  render: () => <TimePickerWrapper label="Disabled Time" value="10:00" disabled />,
};
