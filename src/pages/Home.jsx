import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ loading state

    useEffect(() => {
        appwriteService.getPosts().then((res) => {
            if (res) {
                setPosts(res.documents);
            }
            setLoading(false); // ✅ stop loading after API call
        });
    }, []);

    // ✅ Show loading first (prevents flicker)
    if (loading) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <h1 className="text-xl font-semibold">
                        Loading posts...
                    </h1>
                </Container>
            </div>
        );
    }

    // ✅ Show "No posts" ONLY after loading finishes
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
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

export default Home;
