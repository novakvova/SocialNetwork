import { useCreateChatMutation } from "../../services/apiChat";
import React, { useEffect } from "react";
import { Spin } from "antd";

interface CreateChatProps {
  group_name: string;
  participants: number[];
  is_group: boolean;
  refetch: () => void;
}

const CreateChatComponent: React.FC<CreateChatProps> = ({ group_name, participants, is_group,  refetch }) => {
  const [createChat] = useCreateChatMutation();
  console.log("group_name : ",group_name)
  const handleCreateChat = async () => {
    try {
      if(is_group === false){
        await createChat({
          group_name: undefined,
          is_group: is_group,
          participants: participants,
          slug: `${participants[0]}-${participants[1]}`
        }).unwrap();
      }
      else{
        await createChat({
          group_name: group_name,
          is_group: is_group,
          participants: participants,
          slug: group_name,
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
  return <Spin size="large" />;
};

export default CreateChatComponent;
