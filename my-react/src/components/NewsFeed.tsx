import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/compon/card/PostCard";
import { Post } from "../models/posts";
import { Col, Row } from 'antd';


const NewsFeed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:9178/api/posts/posts/");
                console.log("Fetched posts:", response.data);
                
                const data = Array.isArray(response.data) ? response.data : response.data.results || [];
                setPosts(data);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Cant download posts");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleLike = (postId: number) => {
        axios.post(`http://127.0.0.1:9178/api/posts/${postId}/like/`).then(() => {
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? { ...post, likes_count: post.likes_count + 1 } : post
                )
            );
        });
    };

    const handleComment = (postId: number, comment: string) => {
        axios.post(`http://127.0.0.1:9178/api/posts/${postId}/comments/`, { content: comment }).then(() => {
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId ? { ...post, comments_count: post.comments_count + 1 } : post
                )
            );
        });
    };

    return (
        <Row>
        <Col span={8}></Col>
        <Col span={8}>
        <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">News Feed</h1>
            {loading ? (
                <p className="text-gray-600">Downloading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : posts.length === 0 ? (
                <p>No posts</p>
            ) : (
                <div className="container mx-auto">
                    
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1">
                            {posts.map((post) => (
                                
                                <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
                                
                            ))}
                        </div>
                        
                </div>
            )}
        </div>
        </Col>
        <Col span={8}></Col>
        </Row>
    );
};

export default NewsFeed;
