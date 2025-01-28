import { useCreateChatMutation } from "../../services/apiChat";
import React, { useEffect } from "react";

interface CreateChatProps {
  group: number;
  participants: number[];
}

const CreateChatComponent: React.FC<CreateChatProps> = ({ group, participants }) => {
  const [createChat] = useCreateChatMutation();

  const handleCreateChat = async () => {
    try {
      await createChat({
        group: group,
        is_group: true,
        participants: participants,
      }).unwrap();
      console.log("Чат створено успішно");
    } catch (error) {
      console.error("Помилка при створенні чату:", error);
    }
  };
  useEffect(() => {
    handleCreateChat();
  });
  return <div>Чат створюється автоматично...</div>;
};

export default CreateChatComponent;
