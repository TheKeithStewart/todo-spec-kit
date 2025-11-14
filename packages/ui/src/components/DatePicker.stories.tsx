import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DatePicker from './DatePicker';
import { addDays, subDays } from 'date-fns';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

function DatePickerWrapper(props: Partial<React.ComponentProps<typeof DatePicker>>) {
  const [value, setValue] = useState<Date | undefined>(props.value);

  return (
    <div className="w-80">
      <DatePicker value={value} onChange={setValue} {...props} />
    </div>
  );
}

export const Default: Story = {
  render: () => <DatePickerWrapper label="Select Date" />,
};

export const WithValue: Story = {
  render: () => <DatePickerWrapper label="Appointment Date" value={new Date()} />,
};

export const WithMinDate: Story = {
  render: () => <DatePickerWrapper label="Future Date Only" minDate={new Date()} />,
};

export const WithMaxDate: Story = {
  render: () => <DatePickerWrapper label="Past Date Only" maxDate={new Date()} />,
};

export const WithDateRange: Story = {
  render: () => (
    <DatePickerWrapper
      label="Date Within Range"
      minDate={subDays(new Date(), 7)}
      maxDate={addDays(new Date(), 7)}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <DatePickerWrapper
      label="Date of Birth"
      error="Please select a valid date"
      value={new Date()}
    />
  ),
};

export const Disabled: Story = {
  render: () => <DatePickerWrapper label="Disabled Date" value={new Date()} disabled />,
};
