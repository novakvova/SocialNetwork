import React, { useState } from "react";
import { useGetContactsQuery } from '../services/apiUser';
import PrivateChat from "./Chat/PrivateChat";

const Contacts: React.FC = () => {
    const { data, isLoading, error } = useGetContactsQuery();
    const [selectedContact, setSelectedContact] = useState<string | null>(null);

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Сталася помилка</p>;

    const handleSelectContact = (id: string) => {
        setSelectedContact(id);
    };

    return (
        <div className="flex">
            {/* Список контактів */}
            <div className="w-1/3 p-4 border-r">
                <h1 className="text-4xl font-bold text-gray-800">Контакти</h1>
                <ul className="mt-4 text-gray-600 space-y-4">
                    {data?.map((contact) => (
                        <li
                            key={contact.id}
                            className={`p-1 border rounded-md cursor-pointer ${selectedContact === String(contact.id) ? "bg-blue-100" : "bg-white"}`}
                            onClick={() => handleSelectContact(String(contact.id))}
                        >
                            {contact.username}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Чат з вибраним контактом */}
            <div className="w-2/3 p-4">
                {selectedContact ? (
                    <PrivateChat selectedContactId={Number(selectedContact)} />
                ) : (
                    <p>Виберіть контакт для початку чату</p>
                )}
            </div>
        </div>
    );
};

export default Contacts;
