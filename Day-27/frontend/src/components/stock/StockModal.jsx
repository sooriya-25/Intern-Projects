import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Row,
  Col,
} from "antd";

import { useEffect } from "react";

const sectorOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Retail", label: "Retail" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Energy", label: "Energy" },
  { value: "Automotive", label: "Automotive" },
];

const exchangeOptions = [
  { value: "NASDAQ", label: "NASDAQ" },
  { value: "NYSE", label: "NYSE" },
  { value: "NSE", label: "NSE" },
  { value: "BSE", label: "BSE" },
  { value: "LSE", label: "LSE" },
];

const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "INR", label: "INR" },
  { value: "EUR", label: "EUR" },
];

const StockModal = ({
  open,
  onCancel,
  onSubmit,
  stock,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (stock) {
      form.setFieldsValue(stock);
    } else {
      form.resetFields();

      form.setFieldsValue({
        currency: "USD",
        isActive: true,
      });
    }
  }, [stock, form]);

  const handleFinish = (values) => {
    onSubmit(values);

    if (!stock) {
      form.resetFields();
    }
  };

  return (
    <Modal
      open={open}
      centered
      width={620}
      destroyOnClose
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={stock ? "Update" : "Create"}
      title={
        <div className="pb-2">
          <h2 className="text-xl font-semibold text-slate-800">
            {stock ? "Edit Stock" : "Add Stock"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {stock
              ? "Update stock information."
              : "Create a new stock."}
          </p>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Company"
              name="company"
              rules={[
                {
                  required: true,
                  message: "Company is required",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Apple Inc."
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Symbol"
              name="symbol"
              rules={[
                {
                  required: true,
                  message: "Symbol is required",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="AAPL"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
            >
              <Input.TextArea
                rows={2}
                placeholder="Company description..."
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Sector"
              name="sector"
              rules={[
                {
                  required: true,
                  message: "Select sector",
                },
              ]}
            >
              <Select
                size="large"
                options={sectorOptions}
                placeholder="Select"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Exchange"
              name="exchange"
              rules={[
                {
                  required: true,
                  message: "Select exchange",
                },
              ]}
            >
              <Select
                size="large"
                options={exchangeOptions}
                placeholder="Select"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Currency"
              name="currency"
            >
              <Select
                size="large"
                options={currencyOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Current Price"
              name="currentPrice"
              rules={[
                {
                  required: true,
                  message: "Enter price",
                },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                controls={false}
                min={0}
                placeholder="100"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Market Cap"
              name="marketCap"
              rules={[
                {
                  required: true,
                  message: "Enter market cap",
                },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                controls={false}
                min={0}
                placeholder="1000000000"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Status"
              name="isActive"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default StockModal;