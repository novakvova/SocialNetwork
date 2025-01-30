import React, { useState } from "react";
import { Post } from "../../../models/posts";
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useGetCommentsQuery} from "../../../services/apiPost";




interface PostCardProps {
    post: Post;
    onLike: (postId: number) => void;
    onComment: (postId: number, comment: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
    const [comment, setComment] = useState("");
    const { data: comments, refetch } = useGetCommentsQuery({ postId: post.id });
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    //const { Meta } = Card;
    const handleCommentSubmit = () => {
        onComment(post.id, comment);
        setComment("");
        refetch();
    };

    return (
        
        <div className="news-container">
            <div key={post.id} className="news-item">
          <div className="username_logo">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" className="userlogo" alt="" width={"50px"}/>
            <h2 className="user_name text-l font-bold mt-1">username</h2>
            </div>
            {post.image && <img src={post.image} alt={post.title} className="postimage w-full object-cover rounded" />}
            <div className="news-item-actions">
                <button onClick={() => onLike(post.id)}><HeartIcon /> {post.likes_count}</button>
                <button onClick={() => setIsCommentsOpen(true)}>
                <ChatBubbleOvalLeftIcon /> {post.comments_count}
                </button>
                <button><ShareIcon /> count</button>
                
              </div>
              <h2 className="titlepost">{post.title}</h2>
              <hr />
              <p>{post.content}</p>
              <hr />
              <button onClick={() => setIsCommentsOpen(true)}>
              <p>Show All Comments ({post.comments_count})</p>
              </button>

              {isCommentsOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[80%] max-w-[600px] h-[60vh] overflow-auto">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="font-bold text-2xl text-gray-800">Comments</h3>
                            <button onClick={() => setIsCommentsOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <span className="font-bold text-xl">X</span>
                            </button>
                        </div>
                        <div className="">
                            <ul>
                                {comments?.map((c) => (
                                    <li key={c.id} className="border-b py-3 px-4 text-gray-700">
                                        <strong>{c.user}:</strong> {c.content}
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
            </div>
          
        </div>
        
    );
};

export default PostCard;