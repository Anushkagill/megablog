import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((res) => {
            if (res) {
                setPosts(res.documents);
            }
            setLoading(false);
        });
    }, []);

    // ✅ Loading state
    if (loading) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <h1 className="text-xl font-semibold">Loading posts...</h1>
                </Container>
            </div>
        );
    }

    // ✅ No posts AFTER loading
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">
                        No posts available
                    </h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
