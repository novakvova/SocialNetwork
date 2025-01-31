import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/solid';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    group: string;
    timestamp: string;
}

const NewsFeed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchPosts = async (page: number) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:9178/api/posts/?page=${page}`);
            const newPosts = response.data;

            if (newPosts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            setError("Can't download posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(page);
    }, []);

    return (
        <div className="p-4">
            {loading && page === 1 ? (
                <p className="text-gray-600">Downloading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={() => {
                        if (hasMore) {
                            fetchPosts(page);
                        }
                    }}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>No more posts to display.</p>}
                >
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <li key={post.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                                    <p className="text-gray-600 mt-2">{post.content}</p>
                                </div>
                                <div className="mt-4 text-gray-500 text-sm ">
                                    <span>Author: {post.author}</span> |{" "}
                                    <span>Group: {post.group}</span> |{" "}
                                    <span>{new Date(post.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="news-item-actions mt-4 flex justify-between">
                                    <button><HeartIcon /> Like</button>
                                    <button><ChatBubbleOvalLeftIcon /> Comment</button>
                                    <button><ShareIcon /> Share</button>
                                    <button><EyeIcon /> Views</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default NewsFeed;
