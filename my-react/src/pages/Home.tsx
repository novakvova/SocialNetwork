import React from "react";
import NewsFeed from "../components/NewsFeed";
// import InfiniteScrollPage from "../components/InfiniteScroll";

const Home: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800">Головна сторінка</h1>
            <NewsFeed />
            {/* <InfiniteScrollPage/> */}
        </div>
        
    );
};

export default Home;
