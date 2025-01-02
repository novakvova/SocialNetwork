import { Link } from "react-router";
import React from "react";

const Settings: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800">Про нас</h1>
            <p className="mt-4 text-gray-600">
                Cторінку створено 16.12.2024
            </p>
            <div className="mt-6">
                <Link to="/" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                    Повернутись на головну
                </Link>
            </div>
        </div>
    );
};

export default Settings;