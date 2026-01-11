import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  if (!post) return null;

  return (
    <Link to={`/post/${post.$id}`}>
      <div
        className="
          w-full bg-white rounded-2xl p-4
          shadow-md hover:shadow-2xl
          hover:-translate-y-1 transition-all duration-300
        "
      >
        {post.featuredimage && (
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl mb-3 h-44 w-full object-cover"
          />
        )}

        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {post.title}
        </h2>
      </div>
    </Link>
  );
}
