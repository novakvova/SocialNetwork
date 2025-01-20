import React from "react";
import NewsFeed from "../components/NewsFeed";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Вітаємо на головній сторінці</h1>
            <NewsFeed />
        </div>
    );
};

export default Home;
