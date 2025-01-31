import { Form, Input, Button, notification, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { IGroupPostRequest } from '../../models/types';
import { useCreateGroupMutation } from '../../services/apiGroup';
import { useState } from 'react';

const { Item } = Form;

const CreateGroupPage = () => {
    const [createGroup] = useCreateGroupMutation();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const onFinish = async (values: IGroupPostRequest) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description || '');
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await createGroup(formData).unwrap();
            console.log("Response:", response);

            notification.success({
                message: 'Успішна реєстрація',
                description: 'Ви успішно зареєстровані і створено чат!',
            });

            navigate("..");
            form.resetFields();
            setImageFile(null);
            setPreviewImage(null);
        } catch (err) {
            console.error("Помилка створення групи або чату:", err);
        }
    };

    const beforeUpload = (file: File) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result as string);
        reader.readAsDataURL(file);
        return false;
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
                Створити групу
            </h1>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Item name="name" label="Назва групи" rules={[{ required: true, message: 'Будь ласка, введіть назву групи!' }]}>
                    <Input placeholder="Назва" />
                </Item>
                <Item name="description" label="Вкажіть опис">
                    <TextArea rows={4} placeholder="Текст..." />
                </Item>
                <Item label="Фото групи">
                    <Upload beforeUpload={beforeUpload} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Завантажити фото</Button>
                    </Upload>
                    {previewImage && <img src={previewImage} alt="Групове фото" className="mt-2 w-full max-h-48 object-cover rounded-lg" />}
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
