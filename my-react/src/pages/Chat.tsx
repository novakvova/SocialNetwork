import { useGetChatsQuery } from "../services/apiChat";

const ChatsList = () => {
  const { data: chats, isLoading, error } = useGetChatsQuery();

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження чатів</div>;

  return (
    <ul>
      {chats?.map((chat) => (
        <li key={chat.id}>{chat.participants}</li>
      ))}
    </ul>
  );
};

export default ChatsList;




