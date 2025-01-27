import { useGetMessagesQuery } from "../../services/apiChat";

const ChatMessages = ({ chatId }: { chatId: number }) => {
  const { data: messages, isLoading, error } = useGetMessagesQuery(chatId);
  console.log("Chat Id :", chatId);


  if (isLoading) return <p>Завантаження повідомлень...</p>;
  if (error) return <p>Помилка завантаження повідомлень!</p>;

  return (
    <div>
      <h3>Повідомлення</h3>
      <ul>
        {messages?.map((message) => (
          <li key={message.id}>
            <p><strong>{message.sender}</strong>: {message.content}</p>
            <p><small>{new Date(message.timestamp).toLocaleString()}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
