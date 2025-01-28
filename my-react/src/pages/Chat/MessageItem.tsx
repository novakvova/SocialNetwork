import { Button, Dropdown, Modal, Input, message as antdMessage } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDeleteMessageMutation, useUpdateMessageMutation } from "../../services/apiChat";

const MessageItem = ({ message }: { message: { id: number; chat: number; sender: string | number; content: string; timestamp: string }, chatId: number }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(message.content);
    const [deleteMessage] = useDeleteMessageMutation();
    const [updateMessage] = useUpdateMessageMutation();


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
        <strong>{message.sender}</strong>: {message.content}
      </p>
      <p>
        <small>{new Date(message.timestamp).toLocaleString()}</small>
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
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
