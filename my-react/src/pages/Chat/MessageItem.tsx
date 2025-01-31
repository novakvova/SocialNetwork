import { Button, Dropdown, Modal, Input, message as antdMessage } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDeleteMessageMutation, useUpdateMessageMutation } from "../../services/apiChat";
import { useGetUserQuery } from "../../services/apiUser";

const MessageItem = ({ message, refetch }: { message: { id: number; chat: number; sender: string | number; content: string; timestamp: string }, refetch: () => void, chatId: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const user = useGetUserQuery(Number(message.sender));

  const handleDelete = async () => {
    try {
      await deleteMessage({ messageId: message.id }).unwrap();
      antdMessage.success("Повідомлення видалено!");
      refetch(); 
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
      refetch(); 
    } catch {
      antdMessage.error("Помилка зміни повідомлення!");
    }
  };

  const menuItems = [
    { key: "edit", label: "Змінити", onClick: () => setIsEditing(true) },
    { key: "delete", label: "Видалити", onClick: handleDelete },
  ];

  return (
    <li className="message-item flex mb-4 p-4 border-b border-gray-300">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <p className="font-bold text-left">{user.data?.username}</p>
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />} size="small" />
          </Dropdown>
        </div>
        <p className="text-left">{message.content}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
      </div>

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
