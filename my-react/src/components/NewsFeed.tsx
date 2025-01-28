import React, { useState, useEffect } from "react";
import axios from "axios";

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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:9178/api/posts/");
                setPosts(response.data);
            } catch {
                setError("Cant download posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">News Feed</h1>
            {loading ? (
                <p className="text-gray-600">Downl;oading</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : posts.length === 0 ? (
                <p>Np posts</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <li key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                            <p className="text-gray-600 mt-2">{post.content}</p>
                            <div className="mt-4 text-gray-500 text-sm">
                                <span>Автор: {post.author}</span> |{" "}
                                <span>Група: {post.group}</span> |{" "}
                                <span>{new Date(post.timestamp).toLocaleString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NewsFeed;
