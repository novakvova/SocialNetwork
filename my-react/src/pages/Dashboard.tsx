import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const activities = {
        timeSpent: "2 години",
        likes: 15,
        comments: 8,
        searchHistory: ["React tutorial", "Redux toolkit", "Tailwind CSS"],
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <p><strong>Витрачений час:</strong> {activities.timeSpent}</p>
                <p><strong>Позначки "Подобається":</strong> {activities.likes}</p>
                <p><strong>Кометарі:</strong> {activities.comments}</p>
                <p><strong>Історія пошуку:</strong></p>
                <ul className="list-disc pl-6">
                    {activities.searchHistory.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <div className="mt-4">
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

export default Dashboard;
