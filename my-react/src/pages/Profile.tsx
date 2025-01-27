import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../services/apiUser";
import { useAppSelector } from "../redux/hooks";
import { selectAccount } from "../redux/account/accountSlice";

const Profile: React.FC = () => {
    const currentUser = useAppSelector(selectAccount);
    const navigate = useNavigate();

    const userId = Number(currentUser?.id);

    const { data, error, isLoading } = useGetUserQuery(userId);

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Сталася помилка при завантаженні даних користувача</p>;

    const user = data;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Профіль</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                {user ? (
                    <>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Ім'я користувача:</strong> {user.username}</p>
                        <p><strong>Електронна адреса:</strong> {user.email}</p>
                    </>
                ) : (
                    <p>Дані користувача відсутні</p>
                )}
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
