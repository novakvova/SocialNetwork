import { useGetMessagesQuery } from "../../services/apiChat";

const Messages = ({ chatId }: { chatId: number }) => {
  const { data: messages, error, isLoading } = useGetMessagesQuery({chatId});

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Сталася помилка.</p>;

  return (
    <div>
      <h2>Повідомлення</h2>
      <ul>
        {messages?.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
