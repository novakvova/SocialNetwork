import { useGetMessagesQuery } from "../../services/apiChat";
import MessageItem from "./MessageItem";

const ChatMessages = ({ chatId }: { chatId: number }) => {
  const { data: messages, isLoading, error, refetch } = useGetMessagesQuery(chatId);

  if (isLoading) return <p>Завантаження повідомлень...</p>;
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
