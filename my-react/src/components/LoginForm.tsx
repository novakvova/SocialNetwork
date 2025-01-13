import { useState } from "react";
import { Tabs, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLoginUserMutation } from "../services/apiUser";
import { apiAccount } from "../services/apiAccount";
import { apiToken } from "../services/apiToken";
import { setAccount } from "../redux/account/accountSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
    const [activeTab, setActiveTab] = useState("account");
    const [loginUser] = useLoginUserMutation();
    const dispatch = useDispatch();

    const handleLogin = async (values: { email: string, password: string }) => {
      try {
          // Викликаємо API для входу
          const response = await loginUser({ email: values.email, password: values.password }).unwrap();
          if (response.access) {
              // Зберігаємо токен для подальшого використання
              apiAccount.login(response.access);
              message.success("Успішний вхід!");
              const payload = apiToken.getPayload();
                if (payload) dispatch(setAccount(payload));
          } else {
              message.error("Невірний логін або пароль");
          }
      } catch (error: unknown) {
          if (error instanceof Error) {
              // Тепер ви можете доступитись до властивостей помилки
              if (error?.message === "401") {
                  message.error("Невірний логін або пароль");
              } else {
                  message.error("Сталася помилка при вході.");
              }
          } else {
              message.error("Неочікувана помилка.");
          }
      }
  };
  
    return (
        <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #f0f0f0", borderRadius: 8 }}>
            <Tabs centered activeKey={activeTab} onChange={setActiveTab} items={[{
                key: "account",
                label: "Login",
                children: (
                    <Form
                        name="account_login"
                        initialValues={{ remember: true }}
                        onFinish={handleLogin}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: "Введіть ваш email!" }]}
                        >
                            <Input
                                size="large"
                                prefix={<UserOutlined />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: "Введіть пароль!" }]}
                        >
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined />}
                                placeholder="Пароль"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large">
                                Увійти
                            </Button>
                        </Form.Item>
                    </Form>
                ),
            }]} />
        </div>
    );
};

export default LoginForm;
