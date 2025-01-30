import { useCreateChatMutation } from "../../services/apiChat";
import React, { useEffect } from "react";

interface CreateChatProps {
  group: number;
  participants: number[];
  is_group: boolean;
  refetch: () => void;
}

const CreateChatComponent: React.FC<CreateChatProps> = ({ group, participants, is_group,  refetch }) => {
  const [createChat] = useCreateChatMutation();

  const handleCreateChat = async () => {
    try {
      if(is_group === false){
        await createChat({
          group: undefined,
          is_group: is_group,
          participants: participants,
        }).unwrap();
      }
      else{
        await createChat({
          group: group,
          is_group: is_group,
          participants: participants,
        }).unwrap();
      }
      console.log("Чат створено успішно");
    } catch (error) {
      console.error("Помилка при створенні чату:", error);
    }
  };
  useEffect(() => {
    handleCreateChat();
    refetch();
  }, []);
  return <div>Чат створюється автоматично...</div>;
};

export default CreateChatComponent;
