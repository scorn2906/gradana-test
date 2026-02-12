import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useAuthStore } from "../../../store/auth/auth-store";
import { UseMutationLogin } from "../../../features/auth/api/use-auth-mutation";
import { Link } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const mutationLogin = UseMutationLogin();

  const handleLogin: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await mutationLogin.mutateAsync({
        email: values.email,
        password: values.password,
      });
      const { access_token } = res.data;
      setAuth(access_token);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <Form
        className="border-2 border-gray-300 rounded-lg p-5!"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email!" },
          ]}
        >
          <Input type={"email"} />
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
            Submit
          </Button>
        </Form.Item>
        <Link className="flex items-center justify-center" to="/register">
          Register
        </Link>
      </Form>
    </div>
  );
};

export default LoginPage;
