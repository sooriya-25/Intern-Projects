import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Row,
  Col,
  message,
} from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { useCreateStock } from "../../hooks/useCreateStock";

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

const AddStock = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const { mutate: createStock, isPending } = useCreateStock();

  const handleFinish = (values) => {
    createStock(values, {
      onSuccess: () => {
        message.success("Stock created successfully");

        navigate("/dashboard/stocks");
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 p-3 max-w-3xl mx-auto w-full">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800 mb-0">
            Add Stock
          </h1>

          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/dashboard/stocks")}
            className="px-0 text-slate-500 hover:text-blue-600 hover:bg-transparent"
          >
            Back to Stocks
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-1">Create a new stock entry.</p>
      </div>

      <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm p-8">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            currency: "USD",
            isActive: true,
          }}
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
                <Input size="large" placeholder="Apple Inc." />
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
                <Input size="large" placeholder="AAPL" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={2} placeholder="Company description..." />
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
              <Form.Item label="Currency" name="currency">
                <Select size="large" options={currencyOptions} />
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
              <Form.Item label="Status" name="isActive" valuePropName="checked">
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
            <Button
              size="large"
              className="rounded-full px-6"
              onClick={() => navigate("/dashboard/stocks")}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isPending}
              className="rounded-full px-6"
            >
              Create Stock
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddStock;
