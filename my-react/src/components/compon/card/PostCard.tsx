import React, { useState } from "react";
import { Post } from "../../../models/posts";
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon } from '@heroicons/react/24/solid';
import { useGetCommentsQuery } from "../../../services/apiPost";
import { apiToken } from "../../../services/apiToken";

interface PostCardProps {
    post: Post;
    onLike: (postId: number) => void;
    onComment: (postId: number, comment: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
    const [comment, setComment] = useState("");
    const { data: comments, refetch } = useGetCommentsQuery({ postId: post.id });
    //const [deleteComment] = useDeleteCommentMutation(); // Видалення коментаря
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const isAuthenticated = !!apiToken.getAccessToken(); // Перевірка авторизації
    const payload = apiToken.getPayload();
    const userId = payload ? payload.id : null;

    const handleLikeClick = () => {
        if (!isAuthenticated) {
            setIsAuthModalOpen(true);
            return;
        }
        onLike(post.id);
    };

    const handleCommentClick = () => {
        if (!isAuthenticated) {
            setIsAuthModalOpen(true);
            return;
        }
        setIsCommentsOpen(true);
    };

    const handleCommentSubmit = () => {
        if (comment.trim() === "") return;
        onComment(post.id, comment);
        setComment("");
        refetch();
    };

    // const handleDeleteComment = async (commentId: number) => {
    //     try {
    //         await deleteComment({ commentId }).unwrap();
    //         refetch();
    //     } catch (error) {
    //         console.error("Помилка видалення коментаря:", error);
    //     }
    // };

    return (
        <div className="news-container">
            <div key={post.id} className="news-item">
                <div className="username_logo">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" className="userlogo" alt="" width={"50px"} />
                    <h2 className="user_name text-l font-bold mt-1">username</h2>
                </div>
                {post.image && <img src={post.image} alt={post.title} className="postimage w-full object-cover rounded" />}
                <div className="news-item-actions">
                    <button onClick={handleLikeClick}><HeartIcon /> {post.likes_count}</button>
                    <button onClick={handleCommentClick}><ChatBubbleOvalLeftIcon /> {post.comments_count}</button>
                    <button><ShareIcon /> count</button>
                </div>
                <h2 className="titlepost">{post.title}</h2>
                <hr />
                <p>{post.content}</p>
                <hr />
                <button onClick={handleCommentClick}>
                    <p>Show All Comments ({post.comments_count})</p>
                </button>

                {/* Вікно з коментарями */}
                {isCommentsOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-[80%] max-w-[600px] h-[60vh] overflow-auto">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h3 className="font-bold text-2xl text-gray-800">Comments</h3>
                                <button onClick={() => setIsCommentsOpen(false)} className="text-gray-500 hover:text-gray-700">
                                    <span className="font-bold text-xl">X</span>
                                </button>
                            </div>
                            <div>
                                <ul>
                                    {comments?.map((c) => (
                                        <li key={c.id} className="border-b py-3 px-4 flex justify-between items-center text-gray-700">
                                            <div>
                                                <strong>{c.user}:</strong> {c.content}
                                            </div>
                                            {c.user === userId && ( // Кнопка видалення тільки для своїх коментарів
                                                <button
                                                    //onClick={() => handleDeleteComment(c.id)}
                                                    className="text-red-500 hover:text-red-700 ml-4"
                                                >
                                                    🗑 Видалити
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="border rounded-xl p-3 w-full mb-2"
                                />
                                <button
                                    onClick={handleCommentSubmit}
                                    className="bg-blue-500 text-white rounded-xl px-6 py-3 mt-2 w-full hover:bg-blue-600 transition"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Модальне вікно для неавторизованих */}
                {isAuthModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-[80%] max-w-[400px]">
                            <h3 className="font-bold text-xl text-gray-800 mb-4">Увага!</h3>
                            <p className="text-gray-700">Ви не зареєстровані! Щоб залишати лайки або коментувати, будь ласка, увійдіть або зареєструйтеся.</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => setIsAuthModalOpen(false)}
                                    className="bg-gray-400 text-white rounded-xl px-4 py-2 mr-2 hover:bg-gray-500 transition"
                                >
                                    Закрити
                                </button>
                                <a
                                    href="/login"
                                    className="bg-blue-500 text-white rounded-xl px-4 py-2 hover:bg-blue-600 transition"
                                >
                                    Увійти
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;
