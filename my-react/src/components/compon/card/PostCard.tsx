import React, { useState } from "react";
import { Post } from "../../../models/posts";
import { LikeOutlined, CommentOutlined, SendOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';



interface PostCardProps {
    post: Post;
    onLike: (postId: number) => void;
    onComment: (postId: number, comment: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
    const [comment, setComment] = useState("");
    //const { Meta } = Card;
    const handleCommentSubmit = () => {
        onComment(post.id, comment);
        setComment("");
    };

    return (
        
        <div className="border p-4 rounded shadow">
            <div className="username_logo">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" className="userlogo" alt="" width={"50px"}/>
            <h2 className="user_name text-l font-bold mt-1">{post.title}</h2>
            </div>
            {post.image && <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded" />}
            <h2 className="text-l font-bold mt-3">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
            <div className="likes_comment mt-2 flex ">
                <button className="likes text-blue-500" onClick={() => onLike(post.id)}>
                <LikeOutlined /> {post.likes_count}
                </button>
                <span className="comments">{post.comments_count} <CommentOutlined/></span>
            </div>
            <div className="commentform mt-2">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                />
                <button onClick={handleCommentSubmit} className="bg-blue-500 text-white rounded px-4 py-1 mt-1">
                    Submit
                </button>
            </div>
        </div>
        //<Card
//     style={{ width: 600 }}
//     cover={
//       <img
//         alt={post.title}
//         src={post.image}
//       />
//     }
//     actions={[
//       <SettingOutlined key="setting" />,
//       <EditOutlined key="edit" />,
//       <EllipsisOutlined key="ellipsis" />,
//     ]}
//   >
//     <Meta
//       avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
//       title={post.title}
//       description={post.content}
//     />
//   </Card>

        
    );
};

export default PostCard;