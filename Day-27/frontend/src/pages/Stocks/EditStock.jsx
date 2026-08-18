import { useEffect } from "react";

import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Row,
  Col,

  Result,
} from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useUpdateStock } from "../../hooks/useUpdateStock";
import { useToast } from "../../components/Toast/ToastProvider";

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

const EditStock = () => {
  const [form] = Form.useForm();
  const toast = useToast();

  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  // We navigate here with the stock already in hand (from the card the
  // user clicked "Edit" on), so there's no need for a separate GET call.
  // A stray direct visit / refresh (no state) just gets sent back.
  const stock = state?.stock;

  const { mutate: updateStock, isPending } = useUpdateStock();

  useEffect(() => {
    if (stock) {
      form.setFieldsValue(stock);
    }
  }, [stock, form]);

  if (!stock) {
    return (
      <Result
        status="info"
        title="Nothing to edit here"
        subTitle="Open this page from the Edit button on a stock card so we have its details."
        extra={
          <Button
            type="primary"
            className="rounded-full px-6"
            onClick={() => navigate("/dashboard/stocks")}
          >
            Back to Stocks
          </Button>
        }
      />
    );
  }

  const handleFinish = (values) => {
    updateStock(
      {
        id,
        data: values,
      },
      {
        onSuccess: () => {
          toast.success("Stock updated successfully");

          navigate("/dashboard/stocks");
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-5 p-3 max-w-3xl mx-auto w-full">
<div>
  <div className="flex items-center justify-between">
    <h1 className="text-xl font-semibold text-slate-800 mb-0">
      Edit Stock
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

  <p className="text-sm text-gray-500 mt-1">
    Update information for {stock.company}.
  </p>
</div>

      <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm p-8">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
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
                <Select size="large" options={sectorOptions} placeholder="Select" />
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
                <Select size="large" options={exchangeOptions} placeholder="Select" />
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
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditStock;
