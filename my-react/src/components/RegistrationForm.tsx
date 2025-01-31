import { Form, Input, Button, DatePicker, notification } from 'antd';
import { useRegisterUserMutation } from '../services/apiUser';
import { RegisterField } from '../models/accounts';
import { IRegisterFormValues } from '../models/types';
import { Col, Row } from "antd"
import SideIntro from "../components/SideIntro";

const { Item } = Form;

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [form] = Form.useForm<IRegisterFormValues>();

  const onFinish = async (values: IRegisterFormValues) => {
    try {
      
      const formattedValues: RegisterField = {
        ...values,
        birthDate: values.birthDate.format('YYYY-MM-DD'), 
      };

      const response = await registerUser(formattedValues).unwrap();
      console.log("Response:", response);

      notification.success({
        message: 'Успішна реєстрація',
        description: 'Ви успішно зареєстровані!',
      });

      form.resetFields();
    } catch (err) {
      console.error("Помилка реєстрації:", err);
      notification.error({
        message: 'Помилка реєстрації',
        description: 'Щось пішло не так, спробуйте ще раз.',
      });
    }
  };

  return (
    <Row>
                  <Col span={8}>
                    
                  </Col>
                  <Col span={8}>
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Реєстрація</h2>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
      >
        <Item
          name="username"
          label="Ім'я користувача"
          rules={[
            { required: true, message: 'Будь ласка, введіть ім\'я користувача!' },
            { min: 1, max: 150, message: 'Ім\'я користувача має бути від 1 до 150 символів' },
          ]}
        >
          <Input placeholder="Ім'я користувача" />
        </Item>

        <Item
          name="email"
          label="Електронна пошта"
          rules={[
            { required: true, message: 'Будь ласка, введіть електронну пошту!' },
            { type: 'email', message: 'Невірний формат електронної пошти!' },
          ]}
        >
          <Input type="email" placeholder="Електронна пошта" />
        </Item>

        <Item
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Будь ласка, введіть пароль!' },
            { min: 6, message: 'Пароль повинен бути не менше 6 символів!' },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Пароль" />
        </Item>

        <Item
          name="phoneNumber"
          label="Телефонний номер"
          rules={[
            { max: 15, message: 'Номер телефону може бути максимум 15 символів' },
          ]}
        >
          <Input placeholder="Телефонний номер (необов\'язково)" />
        </Item>

        <Item
          name="birthDate"
          label="Дата народження"
          rules={[
            { required: true, message: 'Будь ласка, виберіть дату народження!' },
          ]}
        >
          <DatePicker style={{ width: '100%' }} placeholder="Дата народження" />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" block>
            Зареєструватися
          </Button>
        </Item>
      </Form>
    </div>
    <SideIntro/>
            </Col>
                  <Col span={8}>
                  </Col>
                </Row>
  );
};

export default Register;
