import React from "react";
import NewsFeed from "../components/NewsFeed";

const Home: React.FC = () => {
    return (
        <div>

            <h1 className="text-4xl font-bold text-gray-800">ITGram</h1>
            <p className="mt-4 text-gray-600">
                Вітаємо на нашій головній сторінці! Дізнайтеся більше про нас.
            </p>

            <h1>Вітаємо на головній сторінці</h1>
            <h1 className="text-4xl font-bold text-gray-800">Головна сторінка</h1>

            <NewsFeed />
            
        </div>
        
    );
};

export default Home;
