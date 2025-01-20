import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectAccount } from "../redux/account/accountSlice";
import { useGetContactsQuery } from "../services/apiUser";

const Profile: React.FC = () => {
    const account = useAppSelector(selectAccount);
    console.log("account", account);
    const { data } = useGetContactsQuery();
    const navigate = useNavigate();
    console.log("contact data", data);

    if (!account) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <p><strong>ID:</strong> {account.id}</p>
                <p><strong>Ім`я користувача:</strong>{account.username}</p>
                <p><strong>Електронна адреса:</strong> {account.email}</p>
                <p><strong>Номер телефону:</strong> {account.phoneNumber}</p>
                <p><strong>Дата народження:</strong> {account.birthDate}</p>
                <div className="mt-4 space-x-4">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => navigate("/dashboard")}
                    >
                        Ваша активність
                    </button>
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        onClick={() => navigate(-1)}
                    >
                        Назад
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;