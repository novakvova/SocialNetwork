import React from "react";
import { Link } from "react-router";

const Contacts: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800">Проекти</h1>
            <p className="mt-4 text-gray-600">
                Тут буде список контактів
            </p>

            <div className="mt-6">
                <Link to="/" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                    Повернутись на головну
                </Link>
            </div>
        </div>
    );
};

export default Contacts;