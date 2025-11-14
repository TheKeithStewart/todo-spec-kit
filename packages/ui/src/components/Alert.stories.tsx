import type { Meta, StoryObj } from '@storybook/react';
import Alert from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your session will expire in 5 minutes. Please save your work.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'There was a problem with your request. Please try again.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'You have 3 unread messages in your inbox.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'This is an alert without a title.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'No Icon',
    showIcon: false,
    children: 'This alert does not show an icon.',
  },
};

export const Closeable: Story = {
  args: {
    variant: 'success',
    title: 'Closeable Alert',
    children: 'Click the X button to dismiss this alert.',
    onClose: () => console.log('Alert closed'),
  },
};

export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Detailed Information',
    children: (
      <>
        <p className="mb-2">
          This is a detailed alert with multiple paragraphs of content. It can contain various
          elements and longer text.
        </p>
        <p>The alert component automatically handles wrapping and spacing for longer content.</p>
      </>
    ),
    onClose: () => console.log('Alert closed'),
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom Icon',
    children: 'This alert uses a custom icon.',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert variant="success" title="Success">
        Operation completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review before proceeding.
      </Alert>
      <Alert variant="error" title="Error" onClose={() => console.log('Closed')}>
        Something went wrong.
      </Alert>
      <Alert variant="info" title="Information">
        Here&apos;s some helpful information.
      </Alert>
    </div>
  ),
};
