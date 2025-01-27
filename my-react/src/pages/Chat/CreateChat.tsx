import { useCreateChatMutation } from '../../services/apiChat';

const CreateChat = ({ groupid }: { groupid: number }) => {
  const [createChat] = useCreateChatMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createChat({ group: groupid});
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="chatName">Chat Name</label>
      <input
        type="text"
        id="chatName"
        required
      />
      <button type="submit">Create Chat</button>
    </form>
  );
};

export default CreateChat;
