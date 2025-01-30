import { Form, Input, Button, notification } from 'antd'; 
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { IGroupPostRequest } from '../../models/types';
import { useCreateGroupMutation } from '../../services/apiGroup';

const { Item } = Form;

const CreateGroupPage = () => {
    const [createGroup] = useCreateGroupMutation();
    const [form] = Form.useForm<IGroupPostRequest>();
    const navigation = useNavigate();

    const onFinish = async (values: IGroupPostRequest) => {
        try {
            // Викликаємо мутацію для створення групи
            const response = await createGroup(values).unwrap();
            console.log("Response:", response);


            // Показуємо повідомлення про успіх
            notification.success({
                message: 'Успішна реєстрація',
                description: 'Ви успішно зареєстровані і створено чат!',
            });

            // Перенаправляємо користувача на попередню сторінку
            navigation("..");

            // Очистити поля форми
            form.resetFields();
        } catch (err) {
            console.error("Помилка створення групи або чату:", err);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
                Створити групу
            </h1>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                <Item
                    name="name"
                    label="Назва групи"
                    rules={[{ required: true, message: 'Будь ласка, введіть назву групи!' }]}>
                    <Input placeholder="Назва" />
                </Item>
                <Item
                    name="description"
                    label="Вкажіть опис"
                >
                    <TextArea
                        rows={4}
                        placeholder="Текст..."
                    />
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" block>
                        Створити Групу
                    </Button>
                </Item>
            </Form>
        </div>
    );
};

export default CreateGroupPage;
