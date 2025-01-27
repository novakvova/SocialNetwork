import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetChatByGroupIdQuery, useCreateMessageMutation } from '../../services/apiChat';
import { Input, Button, Spin, notification } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { selectAccount } from '../../redux/account/accountSlice';
import ChatMessages from './ChatMessages'; 

const ChatBox = ({ groupId }: { groupId: number }) => {
  const [messageContent, setMessageContent] = useState('');
  const { data, isLoading: isChatLoading, error: chatError } = useGetChatByGroupIdQuery(groupId);
  const [createMessage, { isLoading: isSending }] = useCreateMessageMutation();
  console.log("Group Id :", groupId);
  console.log("Chat Id :", data?.id);
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
          chat: data?.id,
          sender: currentUser.id, 
          content: messageContent,
          is_read: false,
        });
        setMessageContent('');
      } catch {
        notification.error({ message: 'Failed to send message', description: 'There was an issue sending your message.' });
      }
    }
  };

  if (isChatLoading) return <Spin size="large" />;
  if (data?.id === undefined) {
    return (
    <>
    <div>Розпочніть спілкування.</div>
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
    </>

  )

  }

  return (
    <div className="chat-box">
      {/* Вставляємо компонент ChatMessages */}
      <div className="messages-list" style={{ padding: '20px', height: '400px', overflowY: 'auto' }}>
        {chatError ? (
          <div>Failed to load messages</div>
        ) : (
          <ChatMessages chatId={Number(data?.id)} />
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
