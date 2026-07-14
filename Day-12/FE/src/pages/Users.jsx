import { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Input, Modal, Popconfirm, Space, Spin, Table, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { addUser, deleteUser, getUsers, updateUser } from "../api/userApi";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const syncUsersToStorage = (nextUsers) => {
    setUsers(nextUsers);
    localStorage.setItem("localUsers", JSON.stringify(nextUsers));
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      const fetchedUsers = response.data || [];
      const storedUsers = JSON.parse(localStorage.getItem("localUsers") || "[]");
      const storedById = new Map(storedUsers.map((user) => [String(user.id), user]));

      const mergedUsers = fetchedUsers.map((user) => {
        const storedUser = storedById.get(String(user.id));
        return storedUser ? { ...user, ...storedUser } : user;
      });

      storedUsers
        .filter((user) => !fetchedUsers.some((item) => String(item.id) === String(user.id)))
        .forEach((user) => mergedUsers.push(user));

      syncUsersToStorage(mergedUsers);
      setError("");
    } catch {
      const storedUsers = localStorage.getItem("localUsers");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        setUsers([]);
        setError("Unable to load users.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddModal = () => {
    form.resetFields();
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      let response;
      let nextUsers = [...users];

      if (editingUser) {
        response = await updateUser(editingUser.id, values);
        if (response.success) {
          nextUsers = nextUsers.map((user) =>
            String(user.id) === String(editingUser.id)
              ? { ...user, ...values, id: editingUser.id }
              : user
          );
          syncUsersToStorage(nextUsers);
          message.success("User updated successfully");
        }
      } else {
        response = await addUser(values);
        if (response.success) {
          const createdUser = response.data || { ...values, id: Date.now().toString() };
          nextUsers = [createdUser, ...nextUsers];
          syncUsersToStorage(nextUsers);
          message.success("User added successfully");
        }
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch {
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response.success) {
        const nextUsers = users.filter((user) => String(user.id) !== String(id));
        syncUsersToStorage(nextUsers);
        message.success("User deleted successfully");
      }
    } catch {
      message.error("Delete failed");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Card
        className="users-page"
        title="Users"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
            Add User
          </Button>
        }
      >
        {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
        <Table rowKey="id" columns={columns} dataSource={users} pagination={false} />
      </Card>

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter a name" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please enter a phone number" }]}> 
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Save</Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Users;
