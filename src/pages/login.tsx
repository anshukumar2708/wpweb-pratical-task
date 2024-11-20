import { Button, Card, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { axiosInstance } from "../services/axios-instance";
import { API_CONFIG } from "../utils/api-path";
import { useNavigate } from "react-router-dom";

interface IValuesType {
  userName: string;
  password: string;
}

const Login = () => {
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const [form] = Form.useForm();

  const handleSubmit = async (value:IValuesType) => {
    setLoading(true);
    console.log(value)
    try {
      const response = await axiosInstance.post(`${API_CONFIG.path.auth}`, value)
      localStorage.setItem("authToken", response?.data?.token)
      message.success("Login Successfull")
      navigate("/")
    } catch (err) {
      console.error('Error logging in:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
    <Card style={{ width: "100%", maxWidth: "400px", margin: "0" }}>
      <Typography.Title
        level={3}
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        Login
      </Typography.Title>
      <Form
       className="w-full"
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          label="User Name"
          rules={[
            {
              required: true,
              message: "User Name is required!",
            },
          ]}
        >
          <Input placeholder="User Name" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
          ]}
        >
          <Input.Password placeholder="password" size="large" />
        </Form.Item>

        <Button
          htmlType="submit"
          loading={loading}
          type="primary"
          size="large"
          block
          className="mt-4"
        >
          Continue
        </Button>

      </Form>
    </Card>
    </div>
  );
};

export default Login;
