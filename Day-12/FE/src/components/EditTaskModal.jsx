import { Modal } from "antd";

import TaskForm from "./TaskForm";

const EditTaskModal = ({
  open,
  task,
  onCancel,
  onUpdate,
}) => {
  return (
    <Modal
      title="Edit Task"
      open={open}
      footer={null}
      onCancel={onCancel}
      destroyOnClose
    >
      <TaskForm
        initialValues={task}
        onSubmit={onUpdate}
        submitText="Update Task"
      />
    </Modal>
  );
};

export default EditTaskModal;