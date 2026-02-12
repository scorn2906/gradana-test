import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { UseMutationRegister } from "../../../features/auth/api/use-auth-mutation";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const mutationRegister = UseMutationRegister();
  const navigate = useNavigate();

  const handleRegister: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await mutationRegister.mutateAsync(values);
      alert("Register success! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Register failed", err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <Form
        className="border-2 border-gray-300 rounded-lg p-5!"
        name="register"
        initialValues={{ remember: true }}
        onFinish={handleRegister}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null} className="flex justify-center">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

        <Link className="flex items-center justify-center" to="/login">
          Already have an account? Login
        </Link>
      </Form>
    </div>
  );
};

export default RegisterPage;
