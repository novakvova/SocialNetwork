import { useState } from 'react';
import { useCreateMessageMutation, useGetChatBySlugQuery } from '../../services/apiChat';
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { Input, Button, Spin, notification } from 'antd';
import CreateChatComponent from './CreateChat';
import ChatMessages from './ChatMessages';
import { SendOutlined } from '@ant-design/icons';

const PrivateChat = ({ selectedContactId }: { selectedContactId: number }) => {
    const [messageContent, setMessageContent] = useState('');
    const [createMessage, { isLoading: isSending }] = useCreateMessageMutation();
    const userId = useSelector((state: RootState) => state.account.account?.id);
    
    // Створюємо два варіанти слагу
    const slug1 = `${selectedContactId}-${userId}`;
    const slug2 = `${userId}-${selectedContactId}`;

    const { data: chatData1, isLoading: isChatLoading1, error: chatError1 } = useGetChatBySlugQuery(slug1, { skip: !userId });
    const { data: chatData2, isLoading: isChatLoading2, error: chatError2 } = useGetChatBySlugQuery(slug2, { skip: !userId });

    // Перевіряємо, який запит повернув чат
    const chatData = chatData1 || chatData2;
    const chatId = chatData?.id;
    const isChatLoading = isChatLoading1 || isChatLoading2;

    // Помилка лише якщо обидва запити не вдалися
    const chatError = !chatData1 && !chatData2 && (chatError1 || chatError2);
    const handleSendMessage = async () => {
      if (messageContent.trim()) {
        if (!userId) {
          notification.error({ message: 'User not authenticated', description: 'Please log in to send messages.' });
          return;
        }

        try {
          await createMessage({
            chat: chatId,
            sender: userId, 
            content: messageContent,
            is_read: false,
          });
          setMessageContent('');
        } catch {
          notification.error({ message: 'Failed to send message', description: 'There was an issue sending your message.' });
        }
      }
    };

    const handleChatMessage = () => {
        if (chatId) {
            return <ChatMessages chatId={Number(chatId)} />;
        }
    };

    if (isChatLoading) return <Spin size="large" />;
    
    // Якщо чат не знайдений, створюємо новий
    if (!chatData) {
      return (
        <CreateChatComponent 
          group_name={String(undefined)} 
          participants={[Number(selectedContactId), Number(userId)]} 
          is_group={false} 
          refetch={() => {}}
        />
      );
    }

    return (
      <div className="chat-box">
        <div className="messages-list" style={{ padding: '20px', height: '400px', overflowY: 'auto' }}>
          {chatError ? (
            <Spin size="large" />
          ) : (
            handleChatMessage()
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

export default PrivateChat;
