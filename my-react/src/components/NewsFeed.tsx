import React from "react";
import { useGetPostsQuery, useLikePostMutation, useCommentPostMutation } from "../services/apiPost";
import PostCard from "../components/compon/card/PostCard";
import { Col, Row } from "antd";

const NewsFeed: React.FC = () => {

  const { data: posts = [], isLoading, isError } = useGetPostsQuery();
  const [likePost] = useLikePostMutation();
  const [commentPost] = useCommentPostMutation();

  const handleLike = (postId: number) => {
    likePost(postId);
  };

  const handleComment = (postId: number, comment: string) => {
    commentPost({ postId, content: comment });
  };

  return (
    
        <div className="p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">YOUR FEED</h1>
          {isLoading ? (
            <p className="text-gray-600">Downloading...</p>
          ) : isError ? (
            <p className="text-red-500">Can`t download posts</p>
          ) : posts.length === 0 ? (
            <p>Nothing To Download</p>
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
      
  );
};

export default NewsFeed;
