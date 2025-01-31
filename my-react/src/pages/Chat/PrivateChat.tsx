import  { useState } from 'react';
import { useCreateMessageMutation,  useGetPrivateChatQuery } from '../../services/apiChat';
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
    const { data, isLoading: isChatLoading, error: chatError, refetch: refetchGroupId} = useGetPrivateChatQuery(selectedContactId);
    const chatId = data?.[0]?.id; 

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
    const handleChatMessadge = () => {
        if(chatId){
            return <ChatMessages chatId={Number(chatId)} />;
        }
    }
  
    if (isChatLoading) return <Spin size="large" />;
    if (chatId === undefined) {
      return (<CreateChatComponent group={Number(undefined)} participants={[Number(selectedContactId)] } is_group={false} refetch={refetchGroupId}/> )
    }
  
    return (
      <div className="chat-box">
        {/* Вставляємо компонент ChatMessages */}
        <div className="messages-list" style={{ padding: '20px', height: '400px', overflowY: 'auto' }}>
          {chatError ? (
            <Spin size="large" />
          ) : (
            handleChatMessadge()
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
