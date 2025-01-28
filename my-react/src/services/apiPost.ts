// import { useState } from "react";
// import axios from "axios";
// //import PostCard from "../components/compon/card/PostCard";
// import { Post } from "../models/posts";



// export const [posts, setPosts] = useState<Post[]>([]);
// export const [loading, setLoading] = useState<boolean>(true);
// export const [error, setError] = useState<string>("");


// export const fetchPosts = async () => {
//     try {
//         const response = await axios.get("http://127.0.0.1:9178/api/posts/posts/");
//         console.log("Fetched posts:", response.data);
//         // Якщо це об'єкт із results, то використовуй response.data.results
//         const data = Array.isArray(response.data) ? response.data : response.data.results || [];
//         setPosts(data);
//     } catch (err) {
//         console.error("Error fetching posts:", err);
//         setError("Cant download posts");
//     } finally {
//         setLoading(false);
//     }
// };

// export const handleLike = (postId: number) => {
//     axios.post(`http://127.0.0.1:9178/api/posts/${postId}/like/`).then(() => {
//         setPosts((prevPosts) =>
//             prevPosts.map((post) =>
//                 post.id === postId ? { ...post, likes_count: post.likes_count + 1 } : post
//             )
//         );
//     });
// };

// export const handleComment = (postId: number, comment: string) => {
//     axios.post(`http://127.0.0.1:9178/api/posts/${postId}/comments/`, { content: comment }).then(() => {
//         setPosts((prevPosts) =>
//             prevPosts.map((post) =>
//                 post.id === postId ? { ...post, comments_count: post.comments_count + 1 } : post
//             )
//         );
//     });
// };