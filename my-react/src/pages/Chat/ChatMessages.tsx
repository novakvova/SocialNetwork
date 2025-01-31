import { useGetMessagesQuery } from "../../services/apiChat";
import MessageItem from "./MessageItem";
import { Spin } from "antd";

const ChatMessages = ({ chatId }: { chatId: number }) => {
  const { data: messages, isLoading, error, refetch } = useGetMessagesQuery(chatId);

  if (isLoading) return <div className="text-center"><Spin size="large" /></div>;
  if (error) return <p>Помилка завантаження повідомлень!</p>;

  return (
    <div>
      <ul>
        {messages?.map((message) => (
          <MessageItem key={message.id} message={message} chatId={chatId} refetch={refetch} />
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
