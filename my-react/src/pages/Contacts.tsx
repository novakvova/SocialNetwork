import React, { useState } from "react";
import { useGetContactsQuery, useGetUserQuery } from "../services/apiUser";
import PrivateChat from "./Chat/PrivateChat";
import { Spin, Alert, Button } from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";

const Contacts: React.FC = () => {
  const { data, isLoading, error } = useGetContactsQuery();
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const { data: dataUser, error: userError } = useGetUserQuery(Number(selectedContact), {
    skip: !selectedContact || !data?.some(contact => contact.id === Number(selectedContact)),
  });
  
  if (userError) {
    console.error("User not found:", userError);
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message="Помилка" description="Не вдалося завантажити контакти." type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="text-center text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 my-4">
        {selectedContact ? `Чат з ${dataUser?.username}` : "Контакти"}
      </div>

      <div className="shadow-lg rounded-lg border p-4">
        {/* Якщо контакт вибраний — показуємо чат */}
        {selectedContact ? (
          <div>
            <Button 
              type="link" 
              icon={<ArrowLeftOutlined />} 
              className="mb-4 text-blue-500"
              onClick={() => setSelectedContact(null)}
            >
              Назад до контактів
            </Button>
            <div className="h-100 overflow-auto flex flex-col-reverse">
                <PrivateChat selectedContactId={Number(selectedContact)} />
            </div>
          </div>
        ) : (
            <div className="h-100 overflow-auto flex flex-col">
                <ul className="text-gray-600 space-y-3">
                {data?.length ? (
                    data.map((contact) => (
                    <li
                        key={contact.id}
                        className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-blue-100 transition"
                        onClick={() => 
                            setSelectedContact(String(contact.id))

                        }
                    >
                        <UserOutlined className="mr-2 text-xl text-blue-500" />
                        {contact.username}
                    </li>
                    ))
                ) : (
                    <p className="text-gray-500">Контактів немає</p>
                )}
                </ul>
            </div>
          
        )}
      </div>
    </div>
  );
};

export default Contacts;
