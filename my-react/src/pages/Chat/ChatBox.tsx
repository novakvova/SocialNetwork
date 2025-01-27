import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery, useCreateMessageMutation } from '../../services/apiChat';
import { Input, Button, List, Avatar, Spin, notification } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Message } from '../../models/types';
import { selectAccount } from '../../redux/account/accountSlice';

interface ChatBoxProps {
  groupId: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({ groupId }) => {
  const [messageContent, setMessageContent] = useState('');
  const { data: messages, isLoading, error } = useGetMessagesQuery({ chatId: groupId });
  const [createMessage, { isLoading: isSending }] = useCreateMessageMutation();

  // Отримуємо актуального користувача з Redux-стану
  const currentUser = useSelector(selectAccount);

  const handleSendMessage = async () => {
    if (messageContent.trim()) {
      if (!currentUser) {
        notification.error({ message: 'User not authenticated', description: 'Please log in to send messages.' });
        return;
      }

      try {
        await createMessage({
          chat: groupId,
          sender: currentUser.id, 
          content: messageContent,
          timestamp: new Date().toISOString(),
          is_read: false,
        });
        setMessageContent('');
      } catch {
        notification.error({ message: 'Failed to send message', description: 'There was an issue sending your message.' });
      }
    }
  };

  if (isLoading) return <Spin size="large" />;

  return (
    <div className="chat-box">
      <div className="messages-list" style={{ padding: '20px', height: '400px', overflowY: 'auto' }}>
        {error ? (
          <div>Failed to load messages</div>
        ) : (
          <List
            dataSource={messages}
            renderItem={(message: Message) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{message.sender.charAt(0)}</Avatar>}
                  title={message.sender}
                  description={message.content}
                />
                <div>{new Date(message.timestamp).toLocaleTimeString()}</div>
              </List.Item>
            )}
          />
        )}
      </div>

      <div className="message-input" style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
        <Input
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type a message..."
          style={{ flex: 1, marginRight: '10px' }}
        />
        <Button
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          loading={isSending}
          disabled={!messageContent.trim()}
        />
      </div>
    </div>
  );
};

export default ChatBox;
