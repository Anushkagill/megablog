import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor =
    post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (!slug) return navigate("/");

    appwriteService.getPost(slug).then((res) => {
      if (res) setPost(res);
      else navigate("/");
    });
  }, [slug, navigate]);

  const deletePost = async () => {
    const status = await appwriteService.deletePost(post.$id);
    if (status) {
      if (post.featuredimage) {
        await appwriteService.deleteFile(post.featuredimage);
      }
      navigate("/");
    }
  };

  if (!post) {
    return (
      <div className="py-8">
        <Container>
          <p>Loading post...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="relative bg-white rounded-2xl shadow-lg p-4 mb-6">
          {post.featuredimage && (
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="max-h-[420px] mx-auto rounded-xl object-contain"
            />
          )}

          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button> Edit </Button>
              </Link>
              <Button onClick={deletePost}> Delete </Button>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

        <div className="browser-css">
          {post.content && parse(post.content)}
        </div>
      </Container>
    </div>
  );
}
