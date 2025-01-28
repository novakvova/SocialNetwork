import { useDeleteMessageMutation, useUpdateMessageMutation } from "../../services/apiChat";
import { Button, Dropdown, Modal, Input, message as antdMessage, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../services/apiUser";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectAccount } from "../../redux/account/accountSlice";

const MessageItem = ({ message}: { message: { id: number; chat: number; sender: string | number; content: string; timestamp: string }, chatId: number }) => {
    
    const account = useAppSelector(selectAccount);
    const userid = Number(account?.id);
    const { data: user, isLoading, error } = useGetUserQuery(userid);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(message.content);

    const [deleteMessage] = useDeleteMessageMutation();
    const [updateMessage] = useUpdateMessageMutation();

    if (isLoading) return <li>Завантаження користувача...</li>;
    if (error) return <li>Помилка завантаження даних користувача</li>;

    const handleDelete = async () => {
    try {
        await deleteMessage({ messageId: message.id }).unwrap();
        antdMessage.success("Повідомлення видалено!");
    } catch {
        antdMessage.error("Помилка видалення повідомлення!");
    }
    };

    const handleUpdate = async () => {
    try {
        const updatePayload = {
        id: message.id,
        chat: message.chat,
        sender: String(message.sender),
        content: editContent,
        is_read: false,
        };

        await updateMessage(updatePayload).unwrap();
        setIsEditing(false);
        antdMessage.success("Повідомлення змінено!");
    } catch {
        antdMessage.error("Помилка зміни повідомлення!");
    }
    };

    const menuItems = [
    { key: "edit", label: "Змінити", onClick: () => setIsEditing(true) },
    { key: "delete", label: "Видалити", onClick: handleDelete },
    ];

    return (
    <li>
        <p>
        <strong>{user?.username || "Невідомий користувач"}</strong>: {message.content}
        </p>
        <p>
        <small>{new Date(message.timestamp).toLocaleString()}</small>
        <Dropdown overlay={<Menu items={menuItems} />} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />} size="small" />
        </Dropdown>
        </p>

        <Modal
        title="Змінити повідомлення"
        open={isEditing}
        onOk={handleUpdate}
        onCancel={() => setIsEditing(false)}
        okText="Зберегти"
        cancelText="Скасувати"
        >
        <Input.TextArea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={4}
        />
        </Modal>
    </li>
    );
    };

export default MessageItem;
