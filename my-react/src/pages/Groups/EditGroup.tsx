import { Form, Input, Button, notification, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGroupQuery, useUpdateGroupMutation } from '../../services/apiGroup';
import { IGroupPutRequest } from '../../models/types';
import { useState, useEffect } from 'react';

const { Item } = Form;

const EditGroupPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: group, isError, isLoading } = useGetGroupQuery(Number(id));
    const [updateGroup] = useUpdateGroupMutation();
    const [form] = Form.useForm<IGroupPutRequest>();
    const navigation = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (group) {
            form.setFieldsValue({
                name: group.name,
                description: group.description || '',
            });
            setPreviewImage(group.image || null);
        }
    }, [group, form]);

    const onFinish = async (values: IGroupPutRequest) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description || '');

            if (image) {
                formData.append('image', image);
            }

            const response = await updateGroup({ id: Number(id), formData }).unwrap();
            console.log("Update group", response);

            notification.success({
                message: 'Групу оновлено',
                description: 'Інформація про групу успішно оновлена!',
            });

            navigation("..");
        } catch (err) {
            console.error("Помилка редагування групи:", err);
            notification.error({
                message: 'Помилка редагування групи',
                description: 'Щось пішло не так, спробуйте ще раз.',
            });
        }
    };

    const beforeUpload = (file: File) => {
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
        return false;
    };

    if (isLoading) return <div>Loading group...</div>;
    if (isError) return <div>Error loading group.</div>;

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
                Зміна групи
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
                        <Button icon={<UploadOutlined />}>Оновити фото</Button>
                    </Upload>
                    {previewImage && <img src={previewImage} alt="Групове фото" className="mt-2 w-full max-h-48 object-cover rounded-lg" />}
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" block>
                        Оновити групу
                    </Button>
                </Item>
            </Form>
        </div>
    );
};

export default EditGroupPage;
