import { Modal, Descriptions } from "antd";

function StudentModal({
  open,
  onClose,
  student,
}) {
  if (!student) return null;

  return (
    <Modal
      title="Student Details"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Descriptions
        bordered
        column={1}
      >
        <Descriptions.Item label="ID">
          {student.id}
        </Descriptions.Item>

        <Descriptions.Item label="Name">
          {student.name}
        </Descriptions.Item>

        <Descriptions.Item label="Age">
          {student.age}
        </Descriptions.Item>

        <Descriptions.Item label="Department">
          {student.department}
        </Descriptions.Item>

        <Descriptions.Item label="Email">
          {student.email}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}

export default StudentModal;