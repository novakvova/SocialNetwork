import { Form, Input, Button, notification } from 'antd'; 
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import {useGetGroupQuery, useUpdateGroupMutation } from '../../services/apiGroup';
import { IGroupPutRequest } from '../../models/types';

const { Item } = Form;

const EditGroupPage = () => {

    const { id } = useParams<{ id: string }>();

    const { data: group, isError, isLoading } = useGetGroupQuery(Number(id));


    const [updateCategory] = useUpdateGroupMutation();

    const [form] = Form.useForm<IGroupPutRequest>();

    const navigation = useNavigate();

    const onFinish = async (values: IGroupPutRequest) => {
        try {
            const group = await updateCategory({...values, id: Number(id)}).unwrap();
            console.log("Update group", group);
            navigation("..");

        } catch (err) {
            console.error("Помилка редагування групи:", err);
            notification.error({
                message: 'Помилка редагування групи',
                description: 'Щось пішло не так, спробуйте ще раз.',
            });
        }
    };

    if (isLoading) return <div>Loading group...</div>;
    if (isError) return <div>Error loading group.</div>;
    return (
        <div style={{maxWidth: '400px', margin: '0 auto'}}>
            <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-6">
                Зміна групи
            </h1>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    name: group?.name,
                    description: group?.description || '',
                }}
            >
                <Item
                    name="name"
                    label="Назва групи"
                    rules={[
                        {required: true, message: 'Будь ласка, введіть назву групи!'},
                        {min: 1, max: 150, message: 'Назва має бути від 1 до 150 символів'},
                    ]}
                >
                    <Input placeholder="Назва"/>
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
                        Оновити групу
                    </Button>
                </Item>
            </Form>
        </div>
    );
};


export default EditGroupPage;
