import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalWrapper(props: Partial<React.ComponentProps<typeof Modal>>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} {...props}>
        <p className="text-gray-700">
          This is the modal content. You can put any content here including forms, text, images, or
          other components.
        </p>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalWrapper title="Default Modal" />,
};

export const Small: Story = {
  render: () => <ModalWrapper title="Small Modal" size="sm" />,
};

export const Large: Story = {
  render: () => <ModalWrapper title="Large Modal" size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalWrapper title="Extra Large Modal" size="xl" />,
};

export const WithFooter: Story = {
  render: () => (
    <ModalWrapper
      title="Modal with Footer"
      footer={
        <>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </>
      }
    />
  ),
};

function WithFormModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Form Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create New Task"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">Create Task</Button>
          </>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
              placeholder="Enter task description"
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

export const WithForm: Story = {
  render: () => <WithFormModal />,
};

export const LongContent: Story = {
  render: () => (
    <ModalWrapper title="Modal with Long Content">
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-gray-700">
            This is paragraph {i + 1}. The modal content is scrollable when it exceeds the viewport
            height.
          </p>
        ))}
      </div>
    </ModalWrapper>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <ModalWrapper title="No Close Button" showCloseButton={false}>
      <p className="text-gray-700 mb-4">
        This modal has no close button. You must use the footer buttons or click outside to close.
      </p>
      <Button variant="ghost" onClick={() => {}}>
        Close from Content
      </Button>
    </ModalWrapper>
  ),
};
