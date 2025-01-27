import React from "react";
import { Link } from "react-router-dom";
import { useGetContactsQuery } from '../services/apiUser';

const Contacts: React.FC = () => {
    const { data, isLoading, error } = useGetContactsQuery();

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Сталася помилка</p>;

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800">Контакти</h1>
            <ul className="mt-4 text-gray-600">
                {data?.map((contact) => (
                    <li key={contact.id}>{contact.username} ({contact.email})</li>
                ))}
            </ul>

            <div className="mt-6">
                <Link to="/" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                    Повернутись на головну
                </Link>
            </div>
        </div>
    );
};

export default Contacts;
